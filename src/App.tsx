"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from "@/context/app-context"

// Layouts
import MainLayout from "@/layouts/MainLayout"
import AuthLayout from "@/layouts/AuthLayout"

// Auth Pages
import LoginPage from "@/pages/auth/login"
import RegisterPage from "@/pages/auth/register"
import ForgotPasswordPage from "@/pages/auth/forgot-password"
import ResetPasswordPage from "@/pages/auth/reset-password"

// Main Pages
import LandingPage from "@/pages/landing-page"
import Dashboard from "@/pages/dashboard"
import UserDashboard from "@/pages/dashboard/user"
import MarketplacePage from "@/pages/marketplace/TokenMarketplacePage"
import ProfilePage from "@/pages/profile/ProfilePage"
import NotFoundPage from "@/pages/NotFoundPage"

// Loading Component
import LoadingSpinner from "@/components/ui/LoadingSpinner"

function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="haki-theme">
      <AppProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="pages/auth/login" element={<LoginPage />} />
            <Route path="pages/auth/register" element={<RegisterPage />} />
            <Route path="pages/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="pages/auth/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Protected Routes */}
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth/login" replace />} />
          <Route path="/dashboard/user" element={user ? <UserDashboard /> : <Navigate to="pages/auth/login" replace />} />
          <Route path="/marketplace" element={user ? <MarketplacePage /> : <Navigate to="pages/auth/login" replace />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="pages/auth/login" replace />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </AppProvider>
    </ThemeProvider>
  )
}

export default App

