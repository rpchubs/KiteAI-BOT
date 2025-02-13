import axios from "axios";
import { rateLimitConfig } from "../../config.js";
import groqService from "./groq.service.js";
import { sleep } from "../utils/helpers.js";

class AgentService {
  constructor() {
    this.lastRequestTime = Date.now();
    this.timeout = 30000;
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

      const question = await groqService.generateQuestion();
      const axiosInstance = axios.create({
        headers: { "Content-Type": "application/json" },
        timeout: this.timeout,
      });

      const payload = { message: question, stream: false };
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

      await axios.post(
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
