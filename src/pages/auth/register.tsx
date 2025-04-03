import { Card, CardContent } from "@/components/ui/card"
import RegisterForm from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-10 flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}

