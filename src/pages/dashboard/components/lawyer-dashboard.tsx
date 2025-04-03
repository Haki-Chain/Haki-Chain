import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Calendar, Clock, DollarSign, FileText, Gavel } from "lucide-react"

// Import mock data
import { mockBounties, mockMilestones } from "@/utils/mock-data"

export function LawyerDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Earnings</p>
                <h3 className="text-2xl font-bold">$8,000</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Gavel className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cases Won</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification status alert if pending */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 flex items-start">
        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" />
        <div>
          <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Verification Pending</h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
            Your account is pending verification by an admin. You'll be able to claim bounties once verified.
          </p>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="active-cases">
        <TabsList>
          <TabsTrigger value="active-cases">Active Cases</TabsTrigger>
          <TabsTrigger value="available-bounties">Available Bounties</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="active-cases" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBounties.slice(0, 2).map((bounty) => (
              <Link to={`/bounty/${bounty.id}`} key={bounty.id}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge>{bounty.category}</Badge>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{bounty.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{bounty.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Next milestone due: {new Date(bounty.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available-bounties" className="space-y-4">
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
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          {mockMilestones.map((milestone) => {
            const bounty = mockBounties.find((b) => b.id === milestone.bountyId)
            return (
              <Card key={milestone.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Bounty</p>
                      <CardTitle className="text-base">{bounty?.title}</CardTitle>
                    </div>
                    <Badge
                      variant={
                        milestone.status === "completed"
                          ? "default"
                          : milestone.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {milestone.status === "completed"
                        ? "Completed"
                        : milestone.status === "in-progress"
                          ? "In Progress"
                          : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{milestone.title}</p>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">${milestone.amount.toLocaleString()}</span>
                      {milestone.status === "in-progress" && <Button size="sm">Mark as Completed</Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}

