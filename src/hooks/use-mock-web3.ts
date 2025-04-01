"use client"

import { useState, useEffect } from "react"

export interface Bounty {
  id: number
  title: string
  description: string
  reward: number
  status: string
  created_by: number
  created_by_username: string
  assigned_to: number | null
  is_on_chain: boolean
  blockchain_tx_hash: string
  blockchain_id: string
  tags: string[]
  created_at: string
  updated_at: string
}

export const useMockData = () => {
  const [bounties, setBounties] = useState<Bounty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockBounties: Bounty[] = [
        {
          id: 1,
          title: "Legal consultation for startup",
          description: "Need legal advice for tech startup incorporation",
          reward: 500,
          status: "open",
          created_by: 2,
          created_by_username: "johndoe",
          assigned_to: null,
          is_on_chain: true,
          blockchain_tx_hash: "0x123abc",
          blockchain_id: "1",
          tags: ["startup", "incorporation", "legal"],
          created_at: "2023-01-15T10:30:00Z",
          updated_at: "2023-01-15T10:30:00Z",
        },
        {
          id: 2,
          title: "Patent filing assistance",
          description: "Need help with patent application for new invention",
          reward: 1200,
          status: "in_progress",
          created_by: 3,
          created_by_username: "janedoe",
          assigned_to: 4,
          is_on_chain: true,
          blockchain_tx_hash: "0x456def",
          blockchain_id: "2",
          tags: ["patent", "intellectual property", "invention"],
          created_at: "2023-02-20T14:15:00Z",
          updated_at: "2023-02-25T09:45:00Z",
        },
        {
          id: 3,
          title: "Contract review for partnership",
          description: "Need legal review of partnership agreement",
          reward: 800,
          status: "completed",
          created_by: 5,
          created_by_username: "bobsmith",
          assigned_to: 6,
          is_on_chain: true,
          blockchain_tx_hash: "0x789ghi",
          blockchain_id: "3",
          tags: ["contract", "partnership", "agreement"],
          created_at: "2023-03-10T11:20:00Z",
          updated_at: "2023-03-18T16:30:00Z",
        },
      ]

      setBounties(mockBounties)
      setLoading(false)
    }, 1000)
  }, [])

  return { bounties, loading }
}

export const mockLawyers = [
  {
    id: 1,
    name: "Jane Smith",
    specialization: "Corporate Law",
    rating: 4.8,
    cases: 24,
    location: "New York, NY",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Michael Johnson",
    specialization: "Intellectual Property",
    rating: 4.6,
    cases: 18,
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Sarah Williams",
    specialization: "Human Rights",
    rating: 4.9,
    cases: 32,
    location: "Washington, DC",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export const mockDonations = [
  {
    id: 1,
    bountyId: 1,
    amount: 250,
    date: "2023-04-15T10:30:00Z",
    donor: "Anonymous",
    txHash: "0xabc123",
  },
  {
    id: 2,
    bountyId: 1,
    amount: 500,
    date: "2023-04-16T14:45:00Z",
    donor: "John Doe",
    txHash: "0xdef456",
  },
  {
    id: 3,
    bountyId: 2,
    amount: 1000,
    date: "2023-04-18T09:15:00Z",
    donor: "Jane Smith",
    txHash: "0xghi789",
  },
]

export const mockMilestones = [
  {
    id: 1,
    bountyId: 2,
    title: "Initial consultation",
    description: "First meeting to discuss patent requirements",
    amount: 300,
    status: "completed",
    dueDate: "2023-03-01T00:00:00Z",
    submissionDate: "2023-02-28T14:30:00Z",
  },
  {
    id: 2,
    bountyId: 2,
    title: "Draft patent application",
    description: "Prepare initial draft of patent application",
    amount: 500,
    status: "completed",
    dueDate: "2023-03-15T00:00:00Z",
    submissionDate: "2023-03-14T16:45:00Z",
  },
  {
    id: 3,
    bountyId: 2,
    title: "File patent application",
    description: "Submit final patent application to patent office",
    amount: 400,
    status: "pending",
    dueDate: "2023-04-01T00:00:00Z",
    submissionDate: null,
  },
]

