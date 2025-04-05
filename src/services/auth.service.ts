import apiService from "./api"
import API_CONFIG from "@/config/appConfig"
import type { User } from "../types/user"

interface LoginResponse {
  access: string
  refresh: string
  user: User
}

interface RegisterResponse {
  access: string
  refresh: string
  user: User
}

interface TokenRefreshResponse {
  access: string
}

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const response = await apiService.post<LoginResponse>(API_CONFIG.auth.login, { email, password })

    // Save tokens to localStorage
    localStorage.setItem("access_token", response.access)
    localStorage.setItem("refresh_token", response.refresh)

    return response.user
  },

  register: async (userData: any): Promise<User> => {
    const response = await apiService.post<RegisterResponse>(API_CONFIG.auth.register, userData)

    // Save tokens to localStorage
    localStorage.setItem("access_token", response.access)
    localStorage.setItem("refresh_token", response.refresh)

    return response.user
  },

  logout: (): void => {
    // Remove tokens from localStorage
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  },

  refreshToken: async (): Promise<string> => {
    const refreshToken = localStorage.getItem("refresh_token")

    if (!refreshToken) {
      throw new Error("No refresh token found")
    }

    const response = await apiService.post<TokenRefreshResponse>(API_CONFIG.auth.refreshToken, {
      refresh: refreshToken,
    })

    // Save new access token to localStorage
    localStorage.setItem("access_token", response.access)

    return response.access
  },

  getCurrentUser: async (): Promise<User> => {
    return apiService.get<User>(API_CONFIG.auth.me)
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    return apiService.patch<User>(API_CONFIG.auth.updateProfile, userData)
  },

  connectWallet: async (walletAddress: string): Promise<User> => {
    return apiService.post<User>(API_CONFIG.auth.connectWallet, { wallet_address: walletAddress })
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("access_token")
  },
}

export default authService

