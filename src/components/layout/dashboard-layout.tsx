"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"
import Navbar from "@/components/navigation/Navbar"
import { Toaster } from "@/components/ui/toaster"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth()

  if (!user) {
    return null // Or a loading state
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
      <Toaster />
    </div>
  )
}

