// Mock API service for development

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  wallet_address?: string
}

interface LoginResponse {
  token: string
  user: User
}

interface RegisterData {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
}

interface Bounty {
  id: number
  title: string
  description: string
  reward: string
  status: string
  creator: {
    id: number
    username: string
  }
  worker?: {
    id: number
    username: string
  }
  created_at: string
  updated_at: string
  blockchain_id?: string
}

// Mock data
const mockBounties: Bounty[] = [
  {
    id: 1,
    title: "Legal Document Review",
    description: "Need a lawyer to review a contract for a software development project.",
    reward: "500",
    status: "open",
    creator: {
      id: 1,
      username: "john_doe",
    },
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    blockchain_id: "0x1234567890abcdef",
  },
  {
    id: 2,
    title: "Patent Filing Assistance",
    description: "Looking for help with filing a patent for a new technology invention.",
    reward: "1000",
    status: "in progress",
    creator: {
      id: 2,
      username: "jane_smith",
    },
    worker: {
      id: 3,
      username: "lawyer_pro",
    },
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    blockchain_id: "0xabcdef1234567890",
  },
  {
    id: 3,
    title: "Trademark Registration",
    description: "Need assistance with registering a trademark for a new brand.",
    reward: "750",
    status: "open",
    creator: {
      id: 1,
      username: "john_doe",
    },
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
    blockchain_id: "0x9876543210abcdef",
  },
]

// API service
const apiService = {
  // Auth endpoints
  login: async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful response
    return {
      success: true,
      data: {
        token: "mock-jwt-token",
        user: {
          id: 1,
          username: "john_doe",
          email: email,
          first_name: "John",
          last_name: "Doe",
          wallet_address: "0x1234...5678",
        },
      },
    }
  },

  register: async (data: RegisterData): Promise<ApiResponse<LoginResponse>> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful response
    return {
      success: true,
      data: {
        token: "mock-jwt-token",
        user: {
          id: 1,
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
        },
      },
    }
  },

  // Bounty endpoints
  getBounties: async (token: string): Promise<ApiResponse<Bounty[]>> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful response
    return {
      success: true,
      data: mockBounties,
    }
  },

  getBountyById: async (id: number, token: string): Promise<ApiResponse<Bounty>> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const bounty = mockBounties.find((b) => b.id === id)

    if (bounty) {
      return {
        success: true,
        data: bounty,
      }
    } else {
      return {
        success: false,
        error: "Bounty not found",
      }
    }
  },

  // Other endpoints can be added as needed
}

export default apiService

