"use client"

import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import AdminSidebar from "../navigation/admin-sidebar"
import AdminHeader from "../navigation/admin-header"
import { useMobile } from "@/hooks/use-mobile"

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isMobile } = useMobile()
  const location = useLocation()

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [location.pathname, isMobile])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

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

