"use client"

import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import PublicNavbar from "../navigation/public-navbar"
import PublicFooter from "../navigation/public-footer"

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <PublicFooter />
    </div>
  )
}

