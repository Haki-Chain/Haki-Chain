import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Import mock data
import { mockBounties } from "@/utils/mock-data"

export function DefaultDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Welcome to Haki</h3>
          <p className="text-muted-foreground mb-4">Please log in or register to access your personalized dashboard.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button variant="default" className="w-full sm:w-auto">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="w-full sm:w-auto">
                Register
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

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
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

