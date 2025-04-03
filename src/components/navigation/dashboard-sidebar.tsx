"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  Home,
  ShoppingBag,
  User,
  Bell,
  MessageSquare,
  FileCheck,
  LogOut,
  ChevronDown,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function DashboardSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
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
          <Link to="/dashboard" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Haki</span>
          </Link>
        </div>

        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="flex flex-col gap-1">
            <NavLink to="/dashboard" icon={Home} label="Dashboard" />
            <NavLink to="/dashboard/marketplace" icon={ShoppingBag} label="Marketplace" />
            <NavLink to="/dashboard/profile" icon={User} label="Profile" />
            <NavLink to="/dashboard/notifications" icon={Bell} label="Notifications" />
            <NavLink to="/dashboard/messages" icon={MessageSquare} label="Messages" />

            {(user?.role === "lawyer" || user?.role === "admin") && (
              <NavLink to="/dashboard/lawyer-verification" icon={FileCheck} label="Verification" />
            )}

            {user?.role === "admin" && (
              <div className="mt-2 pt-2 border-t">
                <div
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-muted cursor-pointer"
                  onClick={() => toggleSection("admin")}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </div>
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", expandedSection === "admin" && "rotate-180")}
                  />
                </div>

                <AnimatePresence>
                  {expandedSection === "admin" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4"
                    >
                      <Link
                        to="/admin"
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors mt-1",
                          isActive("/admin") &&
                            !isActive("/admin/users") &&
                            !isActive("/admin/bounties") &&
                            !isActive("/admin/settings")
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/admin/users"
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive("/admin/users") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <span>Users</span>
                      </Link>
                      <Link
                        to="/admin/bounties"
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive("/admin/bounties") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <span>Bounties</span>
                      </Link>
                      <Link
                        to="/admin/settings"
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive("/admin/settings") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <span>Settings</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
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

