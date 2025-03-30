import type React from "react"
import { Outlet } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"

export const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="haki-theme">
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 flex items-center justify-center p-4">{children || <Outlet />}</main>
        <footer className="py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Haki Platform. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default AuthLayout

