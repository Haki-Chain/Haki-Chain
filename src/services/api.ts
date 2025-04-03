"use client"

import type { User } from "@/types/user"
import { useState } from "react"

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export const callApi = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  mockFunction?: () => Promise<T>
)
: Promise<T> =>
{
  // If we have a mock function, use it instead of making a real API call
  if (mockFunction) {
    return mockFunction();
  }

  try {
    const url = `${process.env.REACT_APP_API_URL || "https://api.example.com"}${endpoint}`

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    // Add auth token if available
    const token = localStorage.getItem("token")
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    const response = await fetch(url, options)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "API request failed")
    }

    return result.data;
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const api = {
    login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
      setLoading(true)
      setError(null)

      try {
        // Mock login response
        const mockResponse: ApiResponse<{ user: User; token: string }> = {
          success: true,
          data: {
            user: {
              id: "1",
              email,
              username: email.split("@")[0],
              first_name: "Test",
              last_name: "User",
              profile_image: "/placeholder.svg?height=200&width=200",
            },
            token: "mock-jwt-token",
          },
        }

        return mockResponse
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error")
        setError(error)
        return { success: false, error: error.message }
      } finally {
        setLoading(false)
      }
    },

    // Add more API methods as needed
  }

  return { callApi, loading, error, api }
}

