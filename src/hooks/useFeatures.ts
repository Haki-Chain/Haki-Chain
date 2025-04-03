"use client"

import { useState, useEffect } from "react"

export function useFeatures() {
  const [isBlockchainEnabled, setIsBlockchainEnabled] = useState(true)
  const [isAiAssistantEnabled, setIsAiAssistantEnabled] = useState(true)

  useEffect(() => {
    // Check environment variables or local storage for feature flags
    const blockchainEnabled = localStorage.getItem("FEATURE_BLOCKCHAIN") !== "false"
    const aiAssistantEnabled = localStorage.getItem("FEATURE_AI_ASSISTANT") !== "false"

    setIsBlockchainEnabled(blockchainEnabled)
    setIsAiAssistantEnabled(aiAssistantEnabled)
  }, [])

  return {
    isBlockchainEnabled,
    isAiAssistantEnabled,
  }
}

