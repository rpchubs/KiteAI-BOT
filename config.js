export const rateLimitConfig = {
    maxRetries: 5,
    baseDelay: 2000,
    maxDelay: 10000,
    requestsPerMinute: 15,
    intervalBetweenCycles: 15000,
    walletVerificationRetries: 3,
  };
  
  export const agents = {
    deployment_p5J9lz1Zxe7CYEoo0TZpRVay: "Professor",
    deployment_7sZJSiCqCNDy9bBHTEh7dwd9: "Crypto Buddy",
    deployment_SoFftlsf9z4fyA3QCHYkaANq: "Sherlock",
  };
  
  export const groqConfig = {
    apiKey: "your-groq-api-key-here",
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
  };
  
  export const refCode = {
    code: "R7H32kqJ"
  }
  