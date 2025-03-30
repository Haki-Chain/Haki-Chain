"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types
interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  wallet_address?: string
}

interface Wallet {
  isConnected: boolean
  address: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

interface AppContextType {
  isAuthenticated: boolean
  user: User | null
  wallet: Wallet
  login: (token: string, user: User) => void
  logout: () => void
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  // Check if user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Login function
  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsAuthenticated(false)
    setUser(null)
    setWalletConnected(false)
    setWalletAddress(null)
  }

  // Wallet functions
  const connectWallet = async () => {
    try {
      // Mock wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setWalletConnected(true)
      setWalletAddress("0x1234...5678")
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  const disconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress(null)
  }

  const wallet: Wallet = {
    isConnected: walletConnected,
    address: walletAddress,
    connect: connectWallet,
    disconnect: disconnectWallet,
  }

  // Context value
  const value = {
    isAuthenticated,
    user,
    wallet,
    login,
    logout,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Hook for using the context
export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

