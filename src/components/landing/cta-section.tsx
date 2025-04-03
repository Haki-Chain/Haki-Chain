import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CTASection() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-700 mb-8">Join our community and start building amazing things today.</p>
        <Button variant="primary" size="lg">
          Sign Up Now
        </Button>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature 1</CardTitle>
              <CardDescription>Description of feature 1.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Details about feature 1.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature 2</CardTitle>
              <CardDescription>Description of feature 2.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Details about feature 2.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature 3</CardTitle>
              <CardDescription>Description of feature 3.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Details about feature 3.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

