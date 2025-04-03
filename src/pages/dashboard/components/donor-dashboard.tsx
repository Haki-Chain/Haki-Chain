import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, DollarSign, FileText, Users } from "lucide-react"

// Import mock data
import { mockBounties, mockDonations } from "@/utils/mock-data"

export function DonorDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donated</p>
                <h3 className="text-2xl font-bold">$1,500</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bounties Supported</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">People Helped</p>
                <h3 className="text-2xl font-bold">120</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="my-contributions">
        <TabsList>
          <TabsTrigger value="my-contributions">My Contributions</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Bounties</TabsTrigger>
          <TabsTrigger value="impact">My Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="my-contributions" className="space-y-4">
          {mockDonations.map((donation) => {
            const bounty = mockBounties.find((b) => b.id === donation.bountyId)
            return (
              <Card key={donation.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{donation.bountyTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">${donation.amount.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">
                        Donated on {new Date(donation.date).toLocaleDateString()}
                      </span>
                    </div>
                    <Link to={`/bounty/${donation.bountyId}`}>
                      <Button variant="outline" size="sm">
                        View Bounty
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockBounties.map((bounty) => (
              <Link to={`/bounty/${bounty.id}`} key={bounty.id}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge>{bounty.category}</Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{bounty.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{bounty.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${(bounty.currentFunding / bounty.fundingGoal) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>${bounty.currentFunding.toLocaleString()}</span>
                        <span>${bounty.fundingGoal.toLocaleString()}</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        Donate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Impact</CardTitle>
              <CardDescription>How your donations have made a difference</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="mx-auto h-16 w-16 mb-2" />
                <p>Impact visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

