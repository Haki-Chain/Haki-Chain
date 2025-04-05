"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useApi } from "@/hooks/use-api"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()
  const api = useApi()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Call the password reset API
      await api.post("/forgot-password", { email })

      setIsSubmitted(true)

      toast({
        title: "Email sent",
        description: "If your email exists in our system, you'll receive password reset instructions.",
      })
    } catch (error) {
      console.error("Forgot password error:", error)

      // Don't reveal if the email exists or not for security
      toast({
        title: "Email sent",
        description: "If your email exists in our system, you'll receive password reset instructions.",
      })

      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            {!isSubmitted
              ? "Enter your email address and we'll send you a link to reset your password."
              : "Check your email for reset instructions."}
          </CardDescription>
        </CardHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>

              <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/login")}>
                Back to Login
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardFooter className="flex flex-col space-y-2">
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

