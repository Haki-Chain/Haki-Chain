import type React from "react"
import { Outlet } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navigation/Navbar"
import Sidebar from "@/components/navigation/Sidebar"
import Footer from "@/components/navigation/Footer"
import { useApp } from "@/context/app-context"

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp()

  return (
    <ThemeProvider defaultTheme="light" storageKey="haki-theme">
      <div className="min-h-screen bg-background flex flex-col">
        {isAuthenticated && <Navbar />}

        <div className="flex-1 flex">
          {isAuthenticated && <Sidebar />}

          <main className="flex-1 p-4">{children || <Outlet />}</main>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default MainLayout

