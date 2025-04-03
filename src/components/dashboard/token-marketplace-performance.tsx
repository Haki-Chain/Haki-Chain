"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { dashboardService } from "@/services/api"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// This component will now handle both the case where we have live data
// and the case where we're still setting up the connection to the token marketplace
const TokenMarketplacePerformance: React.FC = () => {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState("7d")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await dashboardService.getTokenMarketplace()
        setData(response.data)
      } catch (err) {
        setError("Failed to load token marketplace data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  // If we have an error or the API returns a message about connecting to the real API
  if (error || (data && data.message)) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Token Marketplace Performance</CardTitle>
          <CardDescription>Overview of the Haki Platform token marketplace in Kenya</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Required</AlertTitle>
            <AlertDescription>
              {error ||
                data?.message ||
                "The token marketplace data connection is being set up. Please check back later."}
            </AlertDescription>
          </Alert>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Next Steps</h3>
            <p className="text-sm text-gray-500">
              {data?.next_steps || "Connect to your token marketplace API to display real-time market data."}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // If we have valid data, render the full component
  // This part would be updated once we know the exact structure of your live data
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Token Marketplace Performance</CardTitle>
        <CardDescription>Overview of the Haki Platform token marketplace in Kenya</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Live token marketplace data will be displayed here once connected.</p>
      </CardContent>
    </Card>
  )
}

export default TokenMarketplacePerformance

