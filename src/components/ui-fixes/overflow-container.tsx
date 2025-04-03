import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface OverflowContainerProps {
  children: ReactNode
  className?: string
  maxHeight?: string
}

export default function OverflowContainer({ children, className, maxHeight = "80vh" }: OverflowContainerProps) {
  return (
    <div className={cn("overflow-auto", className)} style={{ maxHeight }}>
      {children}
    </div>
  )
}

