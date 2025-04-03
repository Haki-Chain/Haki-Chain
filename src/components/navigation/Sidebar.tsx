import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useApp } from "@/context/app-context"
import { LayoutDashboard, Wallet, Search, PlusCircle, Store, User, Settings, HelpCircle } from "lucide-react"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href, active }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

const Sidebar: React.FC = () => {
  const location = useLocation()
  const { user } = useApp()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <div className="hidden border-r bg-background md:block w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
          <div className="space-y-1">
            <SidebarItem
              icon={<LayoutDashboard className="h-4 w-4" />}
              label="Dashboard"
              href="/"
              active={isActive("/")}
            />
            <SidebarItem
              icon={<Wallet className="h-4 w-4" />}
              label="Wallet"
              href="/wallet"
              active={isActive("/wallet")}
            />
            <SidebarItem
              icon={<Search className="h-4 w-4" />}
              label="Discover Bounties"
              href="/bounties"
              active={isActive("/bounties") && !isActive("/bounties/create")}
            />

            {user?.role === "ngo" && (
              <SidebarItem
                icon={<PlusCircle className="h-4 w-4" />}
                label="Create Bounty"
                href="/bounties/create"
                active={isActive("/bounties/create")}
              />
            )}

            <SidebarItem
              icon={<Store className="h-4 w-4" />}
              label="Token Marketplace"
              href="/marketplace"
              active={isActive("/marketplace")}
            />
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Account</h2>
          <div className="space-y-1">
            <SidebarItem
              icon={<User className="h-4 w-4" />}
              label="Profile"
              href="/profile"
              active={isActive("/profile")}
            />
            <SidebarItem
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
              href="/settings"
              active={isActive("/settings")}
            />
            <SidebarItem
              icon={<HelpCircle className="h-4 w-4" />}
              label="Help & Support"
              href="/support"
              active={isActive("/support")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

