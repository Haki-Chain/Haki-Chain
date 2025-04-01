// Configuration for HakiChain application
export const config = {
  // App information
  appName: "HakiChain",

  // API configuration
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:8000/api",

  // Feature flags
  features: {
    blockchain:
      process.env.REACT_APP_FEATURE_BLOCKCHAIN === "true" || process.env.FEATURE_BLOCKCHAIN === "true" || false,
    aiAssistant:
      process.env.REACT_APP_FEATURE_AI_ASSISTANT === "true" || process.env.FEATURE_AI_ASSISTANT === "true" || false,
  },

  // Blockchain configuration
  blockchain: {
    networkId: process.env.REACT_APP_HEDERA_NETWORK || process.env.HEDERA_NETWORK || "testnet",
    accountId: process.env.REACT_APP_HEDERA_ACCOUNT_ID || process.env.HEDERA_ACCOUNT_ID || "",
    privateKey: process.env.HEDERA_PRIVATE_KEY || "", // Only used server-side
  },
}

