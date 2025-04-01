import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: boolean
}

export default function ResponsiveContainer({
  children,
  className,
  maxWidth = "xl",
  padding = true,
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  }

  return <div className={cn("w-full mx-auto", maxWidthClasses[maxWidth], padding && "px-4", className)}>{children}</div>
}

