import axios from "axios";
import fs from "fs";
import { HttpsProxyAgent } from "https-proxy-agent";
import { HttpProxyAgent } from "http-proxy-agent";
import { rateLimitConfig, proxyConfig  } from "../../config.js";
import groqService from "./groq.service.js";
import { sleep } from "../utils/helpers.js";
import dashboard from "../ui/dashboard.js";

class AgentService {
  constructor() {
    this.lastRequestTime = Date.now();
    this.timeout = 60000;
    this.proxyIndex = 0;
    this.proxies = proxyConfig.useProxy ? this.loadProxies() : [];
    this.currentProxy = null;
    this.axiosInstance = proxyConfig.useProxy ? this.createAxiosInstance(this.getNextProxy()) : axios.create({
      headers: { "Content-Type": "application/json" },
      timeout: this.timeout,
    });

    if (!proxyConfig.useProxy) {
      dashboard.log("🚀 Running without proxy.");
    }
  }

  loadProxies() {
    try {
      const proxies = fs
        .readFileSync("proxies.txt", "utf8")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("http")); // Chỉ lấy proxy đúng định dạng

      if (proxies.length === 0) {
        dashboard.log("No valid proxies found in proxies.txt!");
        process.exit(1);
      }

      return proxies;
    } catch (error) {
      dashboard.log("Error reading proxies.txt:", error.message);
      process.exit(1);
    }
  }

  getNextProxy() {
    if (!proxyConfig.useProxy || this.proxies.length === 0) return null;

    this.currentProxy = this.proxies[this.proxyIndex];
    this.proxyIndex = (this.proxyIndex + 1) % this.proxies.length;
    
    return this.currentProxy;
  }

  createAxiosInstance(proxyUrl) {
    if (!proxyConfig.useProxy || !proxyUrl) {
      return axios.create({
        headers: { "Content-Type": "application/json" },
        timeout: this.timeout,
      });
    }

    const isHttp = proxyUrl.startsWith("http://");
    const agent = isHttp ? new HttpProxyAgent(proxyUrl) : new HttpsProxyAgent(proxyUrl);

    return axios.create({
      headers: { "Content-Type": "application/json" },
      timeout: this.timeout,
      proxy: false,
      httpAgent: isHttp ? agent : undefined,
      httpsAgent: !isHttp ? agent : undefined,
    });
  }

  async updateProxy() {
    if (!proxyConfig.useProxy) return;
    const proxyUrl = this.getNextProxy();
    this.axiosInstance = this.createAxiosInstance(proxyUrl);
  }

  async getCurrentIP() {
    if (!proxyConfig.useProxy) return "Direct Connection";
    
    try {
      const response = await this.axiosInstance.get("http://api64.ipify.org?format=json");
      return response.data.ip || "Unknown";
    } catch (error) {
      dashboard.log("Error fetching proxy IP:", error.message);
      return "Unknown";
    }
  }

  calculateDelay(attempt) {
    return Math.min(
      rateLimitConfig.maxDelay,
      rateLimitConfig.baseDelay * Math.pow(2, attempt)
    );
  }

  async checkRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const minimumInterval = 60000 / rateLimitConfig.requestsPerMinute;

    if (timeSinceLastRequest < minimumInterval) {
      const waitTime = minimumInterval - timeSinceLastRequest;
      await sleep(waitTime);
    }

    this.lastRequestTime = Date.now();
  }

  async sendQuestion(agent) {
    try {
      await this.checkRateLimit();

      await this.updateProxy();
      const currentIP = await this.getCurrentIP();
      dashboard.log(`Using Proxy IP: ${currentIP}`);

      let question = await groqService.generateQuestion();
      const axiosInstance = axios.create({
        headers: { "Content-Type": "application/json" },
        timeout: this.timeout,
      });

      question = `Answer the following question very briefly: ${question}`

      const payload = { message: question, stream: false };
      dashboard.log(`Question generated: ${question}`)
      const response = await axiosInstance.post(
        `https://${agent
          .toLowerCase()
          .replace("_", "-")}.stag-vxzy.zettablock.com/main`,
        payload
      );

      if (!response.data?.choices?.[0]?.message) {
        throw new Error("Invalid response format from agent");
      }

      return {
        question,
        response: response.data.choices[0].message,
      };
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        throw new Error(`Request timeout after ${this.timeout / 1000} seconds`);
      }
      throw error;
    }
  }

  async reportUsage(wallet, options, retryCount = 0) {
    try {
      await this.checkRateLimit();

      const payload = {
        wallet_address: wallet,
        agent_id: options.agent_id,
        request_text: options.question,
        response_text: options.response,
        request_metadata: {},
      };

      await this.axiosInstance.post(
        "https://quests-usage-dev.prod.zettablock.com/api/report_usage",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: this.timeout,
        }
      );

      return true;
    } catch (error) {
      const isRateLimit = error.response?.data?.error?.includes(
        "Rate limit exceeded"
      );

      if (isRateLimit && retryCount < rateLimitConfig.maxRetries) {
        const delay = this.calculateDelay(retryCount);
        await sleep(delay);
        return this.reportUsage(wallet, options, retryCount + 1);
      }

      return false;
    }
  }
}

export default new AgentService();
