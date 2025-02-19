export const rateLimitConfig = {
    maxRetries: 5,
    baseDelay: 2000,
    maxDelay: 10000,
    requestsPerMinute: 15,
    intervalBetweenCycles: 5000,
    walletVerificationRetries: 3,
  };
  
  export const agents = {
    deployment_5PG1mnhm7h5pvHnTxE90f9XB: "Professor",
    deployment_nD28Y8LniIYZpVqgfTBW2nH1: "Crypto Buddy",
    deployment_nC8HdPWdvy8SNOoYpA5SqCVc: "Sherlock",
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