"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: number
  max?: number
  min?: number
  step?: number
  value?: number
  onValueChange?: (value: number) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, defaultValue, max = 100, min = 0, step = 1, value, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<number>(value ?? defaultValue ?? min)

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    const percentage = ((internalValue - min) / (max - min)) * 100

    return (
      <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div className="absolute h-full bg-primary" style={{ width: `${percentage}%` }} />
        </div>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={internalValue}
          onChange={handleChange}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
          {...props}
        />
      </div>
    )
  },
)

Slider.displayName = "Slider"

export { Slider }