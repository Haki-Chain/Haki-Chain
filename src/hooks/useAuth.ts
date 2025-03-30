"use client"

import { useState, useEffect, useCallback } from "react"

// Define user types
export type UserRole = "ngo" | "donor" | "lawyer" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error("Auth check error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // Mock API call - in a real app, this would be an actual API request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (email === "admin@example.com" && password === "password") {
        const mockUser: User = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      } else if (email === "ngo@example.com" && password === "password") {
        const mockUser: User = {
          id: "2",
          name: "NGO User",
          email: "ngo@example.com",
          role: "ngo",
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      } else if (email === "lawyer@example.com" && password === "password") {
        const mockUser: User = {
          id: "3",
          name: "Lawyer User",
          email: "lawyer@example.com",
          role: "lawyer",
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      } else if (email === "donor@example.com" && password === "password") {
        const mockUser: User = {
          id: "4",
          name: "Donor User",
          email: "donor@example.com",
          role: "donor",
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      } else {
        setError("Invalid email or password")
        return false
      }
    } catch (err: any) {
      setError(err.message || "Login failed")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(
    async (name: string, email: string, password: string, role: UserRole = "ngo"): Promise<boolean> => {
      setIsLoading(true)
      setError(null)

      try {
        // Mock API call - in a real app, this would be an actual API request
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock registration
        const mockUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          role,
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      } catch (err: any) {
        setError(err.message || "Registration failed")
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const logout = useCallback(() => {
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
  }
}

