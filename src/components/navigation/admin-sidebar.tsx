"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, LayoutDashboard, Users, FileText, Settings, BarChart, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function AdminSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation()
  const { logout } = useAuth()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const sidebarVariants = {
    open: {
      width: "240px",
      transition: { duration: 0.3 },
    },
    closed: {
      width: "0px",
      transition: { duration: 0.3 },
    },
  }

  const NavLink = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive(to) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
      )}
      onClick={() => setIsOpen(false)}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card md:relative md:w-64 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <Link to="/admin" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Haki Admin</span>
          </Link>
        </div>

        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="flex flex-col gap-1">
            <NavLink to="/admin" icon={LayoutDashboard} label="Dashboard" />
            <NavLink to="/admin/users" icon={Users} label="Users" />
            <NavLink to="/admin/bounties" icon={FileText} label="Bounties" />
            <NavLink to="/admin/analytics" icon={BarChart} label="Analytics" />
            <NavLink to="/admin/settings" icon={Settings} label="Settings" />
          </nav>
        </div>

        <div className="border-t p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </Button>
        </div>
      </motion.aside>
    </>
  )
}

