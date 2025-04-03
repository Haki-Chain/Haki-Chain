"use client"

import type React from "react"

import { useState } from "react"
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { BarChart, LineChart, PieChart, Activity, Users, DollarSign, Clock } from "lucide-react"
import ResponsiveContainer from "@/components/ui-fixes/responsive-container"
import OverflowContainer from "@/components/ui-fixes/overflow-container"
import { useAuth } from "@/hooks/use-auth"
import { useMockData } from "@/hooks/use-mock-data"

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useAuth()
  const { getBountyStats, getUserStats, getFinancialStats } = useMockData()

  // Get appropriate stats based on user role
  const bountyStats = getBountyStats(user?.role)
  const userStats = getUserStats(user?.role)
  const financialStats = getFinancialStats(user?.role)

  return (
    <ResponsiveContainer maxWidth="full">
      <h1 className="mb-6 text-2xl font-bold">Analytics Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="bounties" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Bounties</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Financial</span>
          </TabsTrigger>
        </TabsList>

        <OverflowContainer>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Bounties"
                value={bountyStats.total.toString()}
                change={bountyStats.change}
                icon={<BarChart className="h-5 w-5" />}
              />
              <StatCard
                title="Active Users"
                value={userStats.active.toString()}
                change={userStats.change}
                icon={<Users className="h-5 w-5" />}
              />
              <StatCard
                title="Revenue"
                value={`$${financialStats.revenue.toLocaleString()}`}
                change={financialStats.revenueChange}
                icon={<DollarSign className="h-5 w-5" />}
              />
              <StatCard
                title="Avg. Resolution Time"
                value={`${bountyStats.avgResolutionTime} days`}
                change={bountyStats.timeChange}
                icon={<Clock className="h-5 w-5" />}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">Bounty Activity</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <LineChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">User Growth</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <BarChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bounties" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">Bounty Status</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <PieChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">Bounty Categories</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <PieChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">Bounty Value Distribution</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <BarChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="mb-4 text-lg font-medium">Bounty Timeline</h3>
              <div className="h-64 w-full">
                {/* Chart would go here - using placeholder */}
                <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                  <LineChart className="h-8 w-8 text-muted-foreground/60" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">User Roles</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <PieChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">User Activity</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <LineChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">New Registrations</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <BarChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">Revenue Breakdown</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <PieChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">Transaction Volume</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <LineChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-medium">Average Bounty Value</h3>
                <div className="h-64 w-full">
                  {/* Chart would go here - using placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/40">
                    <BarChart className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </OverflowContainer>
      </Tabs>
    </ResponsiveContainer>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        <p className={`mt-1 text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? "+" : ""}
          {change}% from last month
        </p>
      </div>
    </Card>
  )
}

