import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.REACT_APP_FEATURE_BLOCKCHAIN": JSON.stringify(process.env.REACT_APP_FEATURE_BLOCKCHAIN || "true"),
    "process.env.REACT_APP_FEATURE_AI_ASSISTANT": JSON.stringify(process.env.REACT_APP_FEATURE_AI_ASSISTANT || "true"),
    "process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS": JSON.stringify(process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS || ""),
    "process.env.REACT_APP_BOUNTY_CONTRACT_ADDRESS": JSON.stringify(
      process.env.REACT_APP_BOUNTY_CONTRACT_ADDRESS || "",
    ),
    "process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS": JSON.stringify(
      process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS || "",
    ),
    "process.env.REACT_APP_HEDERA_NETWORK": JSON.stringify(process.env.REACT_APP_HEDERA_NETWORK || "testnet"),
    "process.env.REACT_APP_HEDERA_ACCOUNT_ID": JSON.stringify(process.env.REACT_APP_HEDERA_ACCOUNT_ID || "0.0.5804463"), 
    // "process.env.REACT_APP_HEDERA_ACCOUNT_ID": JSON.stringify(process.env.REACT_APP_HEDERA_ACCOUNT_ID || "0.0.5804429"), 
    "process.env.REACT_APP_HEDERA_PRIVATE_KEY": JSON.stringify(process.env.REACT_APP_HEDERA_PRIVATE_KEY || "0x234dff3fbe3d23e916b4b98ce562d3a2d92ed728"),
    "process.env.REACT_APP_API_URL": JSON.stringify(process.env.REACT_APP_API_URL || ""),
    "process.env.REACT_APP_OPENAI_API_KEY": JSON.stringify(process.env.REACT_APP_OPENAI_API_KEY || ""),
  },
})

