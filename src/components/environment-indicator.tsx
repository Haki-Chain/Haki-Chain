import { Badge } from "@/components/ui/badge"

interface EnvironmentIndicatorProps {
  className?: string
}

export function EnvironmentIndicator({ className }: EnvironmentIndicatorProps) {
  // Determine environment
  const environment = process.env.NODE_ENV === "production" ? "production" : "development"

  return (
    <Badge variant={environment === "production" ? "default" : "outline"} className={className}>
      {environment}
    </Badge>
  )
}

