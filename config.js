export const rateLimitConfig = {
    maxRetries: 5,
    baseDelay: 2000,
    maxDelay: 10000,
    requestsPerMinute: 15,
    intervalBetweenCycles: 5000,
    walletVerificationRetries: 3,
  };
  
  export const agents = {
    deployment_htmTBVZpC0vbOkTAHRrv1b7F: "Professor",
    deployment_18oZhIVeJnm9B2a8kWfZrGbJ: "Crypto Buddy",
    deployment_zs6OE0EdBuQuit8KK0V10dJT: "Sherlock",
  };
  
  export const groqConfig = {
    apiKey: "your-groq-api-key-here",
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
  };
  
  export const refCode = {
    code: "R7H32kqJ"
  }
  
  export const proxyConfig = {
    useProxy: true, // false if not use proxy
};