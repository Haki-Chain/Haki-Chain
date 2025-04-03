"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth, type User } from "@/hooks/useAuth"

interface AppContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth()
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  // Check for dark mode preference on mount
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode")
    if (darkModePreference === "true") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev
      localStorage.setItem("darkMode", String(newValue))

      if (newValue) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }

      return newValue
    })
  }

  // Modified register function to accept a userData object
  const register = async (userData: any): Promise<boolean> => {
    try {
      const { first_name, last_name, email, password } = userData
      const name = `${first_name} ${last_name}`
      return await auth.register(name, email, password, "ngo")
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const value = {
    ...auth,
    register,
    isDarkMode,
    toggleDarkMode,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

