"use client"

import { useState, useEffect, createContext, useContext } from "react"
import type { User } from "@/types/user"

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Partial<User>) => Promise<boolean>
  logout: () => void
  updateProfile?: (userData: Partial<User>) => Promise<boolean>
  verifyLawyer?: () => Promise<boolean>
  connectWallet?: () => Promise<boolean>
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export const useAuth = () => useContext(AuthContext)

export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored auth token on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login for now
      const mockUser: User = {
        id: "1",
        email,
        username: email.split("@")[0],
        first_name: "Test",
        last_name: "User",
        profile_image: "/placeholder.svg?height=200&width=200",
      }

      setUser(mockUser)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Login failed", error)
      return false
    }
  }

  const register = async (userData: Partial<User>): Promise<boolean> => {
    try {
      // Mock registration
      const mockUser: User = {
        id: "1",
        email: userData.email || "test@example.com",
        username: userData.username || "testuser",
        first_name: userData.first_name || "Test",
        last_name: userData.last_name || "User",
        profile_image: "/placeholder.svg?height=200&width=200",
      }

      setUser(mockUser)
      setIsAuthenticated(true)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Registration failed", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false

      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return true
    } catch (error) {
      console.error("Profile update failed", error)
      return false
    }
  }

  const verifyLawyer = async (): Promise<boolean> => {
    try {
      if (!user) return false

      const updatedUser = {
        ...user,
        is_verified: true,
        verificationStatus: "verified",
      }

      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return true
    } catch (error) {
      console.error("Lawyer verification failed", error)
      return false
    }
  }

  const connectWallet = async (): Promise<boolean> => {
    // Mock wallet connection
    return true
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    verifyLawyer,
    connectWallet,
  }
}

