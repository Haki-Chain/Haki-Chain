import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Bounties</CardTitle>
            <CardDescription>All bounties on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Bounties</CardTitle>
            <CardDescription>Bounties you've created</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Token Balance</CardTitle>
            <CardDescription>Your HAKI token balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,250 HAKI</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent platform activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="font-medium">Bounty Created</p>
                <p className="text-sm text-gray-500">You created a new bounty "Legal Document Review"</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Token Transfer</p>
                <p className="text-sm text-gray-500">You received 500 HAKI tokens</p>
                <p className="text-xs text-gray-400">Yesterday</p>
              </div>
              <div>
                <p className="font-medium">Profile Updated</p>
                <p className="text-sm text-gray-500">You updated your profile information</p>
                <p className="text-xs text-gray-400">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full">Create Bounty</Button>
              <Button className="w-full" variant="outline">
                View Marketplace
              </Button>
              <Button className="w-full" variant="outline">
                Manage Wallet
              </Button>
              <Button className="w-full" variant="outline">
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage

