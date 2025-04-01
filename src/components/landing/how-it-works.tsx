import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const HowItWorks = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
        <p className="text-gray-600 mb-8">
          Learn how our platform can help you achieve your goals in a few simple steps.
        </p>

        <Tabs defaultValue="step1" className="w-full">
          <TabsList className="justify-center">
            <TabsTrigger value="step1">Step 1: Sign Up</TabsTrigger>
            <TabsTrigger value="step2">Step 2: Connect</TabsTrigger>
            <TabsTrigger value="step3">Step 3: Profit</TabsTrigger>
          </TabsList>
          <TabsContent value="step1" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>
                  Sign up for a free account to get started. It only takes a few minutes!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Enter your email address and create a secure password.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="step2" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Accounts</CardTitle>
                <CardDescription>Link your existing accounts to our platform for seamless integration.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Securely connect your accounts using our OAuth integration.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="step3" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Start Earning</CardTitle>
                <CardDescription>Begin earning rewards and achieving your goals.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Watch your earnings grow as you use our platform.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default HowItWorks

