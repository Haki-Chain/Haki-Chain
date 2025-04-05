import { Card, CardContent } from "@/components/ui/card"
import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="container mx-auto py-10 flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

