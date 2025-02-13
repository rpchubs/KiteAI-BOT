import { Groq } from "groq-sdk";
import { groqConfig } from "../../config.js";

class GroqService {
  constructor() {
    this.client = new Groq({
      apiKey: groqConfig.apiKey,
    });
  }

  async generateQuestion() {
    try {
      const prompt = `Generate a random, engaging question about blockchain, cryptocurrency, or Web3 technology. 
                     Make it thought-provoking and suitable for an AI assistant to answer.
                     Return only the question, nothing else.`;

      const completion = await this.client.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: groqConfig.model,
        temperature: groqConfig.temperature,
      });

      return completion.choices[0]?.message?.content?.trim();
    } catch (error) {
      console.error("Error generating question:", error.message);
      return "What are the key benefits of blockchain technology?";
    }
  }
}

export default new GroqService();
