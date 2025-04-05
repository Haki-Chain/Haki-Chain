"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { User } from "@/types/user"
import authService from "@/services/auth.service"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<boolean>
  connectWallet: (walletAddress: string) => Promise<boolean>
}

// Create context
const AppContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")

      if (token) {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
        setIsAuthenticated(true)
      }
    } catch (err: any) {
      console.error("Error checking authentication:", err)
      authService.logout()
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.login(email, password)
      setUser(response)
      setIsAuthenticated(true)
      return true
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (userData: any): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.register(userData)
      setUser(response)
      setIsAuthenticated(true)
      return true
    } catch (err: any) {
      setError(err.message || "Failed to register")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const updateProfile = useCallback(async (userData: Partial<User>): Promise<boolean> => {
    try {
      const updatedUser = await authService.updateProfile(userData)
      setUser(updatedUser)
      return true
    } catch (error) {
      console.error("Profile update failed", error)
      return false
    }
  }, [])

  const connectWallet = useCallback(async (walletAddress: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const updatedUser = await authService.connectWallet(walletAddress)
      setUser(updatedUser)
      return true
    } catch (error: any) {
      setError(error.response?.data?.detail || "Failed to connect wallet. Please try again.")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    connectWallet,
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

