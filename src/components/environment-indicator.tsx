import type React from "react"

export const EnvironmentIndicator: React.FC = () => {
  const env = process.env.NODE_ENV || "development"

  if (env === "production") {
    return null
  }

  const bgColor = env === "development" ? "bg-blue-500" : "bg-yellow-500"

  return <div className={`fixed top-0 right-0 z-50 px-2 py-1 text-xs text-white ${bgColor}`}>{env.toUpperCase()}</div>
}

