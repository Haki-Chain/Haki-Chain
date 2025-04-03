"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute inset-0 rounded-full bg-primary/20"
          />
          <Shield className="relative h-16 w-16 text-primary" />
        </div>

        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Haki Platform
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 150 }}
          transition={{
            delay: 0.5,
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="mt-4 h-1 bg-primary"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 text-sm text-muted-foreground"
        >
          Loading secure legal services...
        </motion.p>
      </motion.div>
    </div>
  )
}

