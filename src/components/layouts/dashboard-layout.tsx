"use client"

import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import DashboardSidebar from "../navigation/dashboard-sidebar"
import DashboardHeader from "../navigation/dashboard-header"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isMobile } = useMobile()
  const location = useLocation()
  const { toast } = useToast()

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [location.pathname, isMobile])

  // Show welcome toast on first dashboard visit
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      toast({
        title: "Welcome to your dashboard",
        description: "You can manage your bounties and profile here.",
      })
    }
  }, [location.pathname, toast])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <motion.main
          className="flex-1 overflow-auto p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}

