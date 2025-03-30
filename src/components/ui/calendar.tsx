"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

// Simple calendar implementation without dependencies
export type CalendarProps = {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | { from: Date; to: Date }
  onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void
  month?: Date
  onMonthChange?: (date: Date) => void
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
  disabled?: boolean | ((date: Date) => boolean)
  initialFocus?: boolean
}

function Calendar({
  mode = "single",
  selected,
  onSelect,
  month: initialMonth = new Date(),
  onMonthChange,
  className,
  classNames,
  showOutsideDays = true,
  disabled,
  initialFocus,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(initialMonth)

  // Helper functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const isDateSelected = (date: Date) => {
    if (!selected) return false

    if (mode === "single" && selected instanceof Date) {
      return date.toDateString() === selected.toDateString()
    }

    if (mode === "range" && typeof selected === "object" && "from" in selected && "to" in selected) {
      const { from, to } = selected
      return date >= from && date <= to
    }

    if (mode === "multiple" && Array.isArray(selected)) {
      return selected.some((d) => d.toDateString() === date.toDateString())
    }

    return false
  }

  const isDateDisabled = (date: Date) => {
    if (typeof disabled === "boolean") return disabled
    if (typeof disabled === "function") return disabled(date)
    return false
  }

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return

    if (mode === "single") {
      onSelect?.(date)
    } else if (mode === "range" && typeof selected === "object" && "from" in selected && "to" in selected) {
      // Implement range selection logic
      const { from } = selected
      if (!from) {
        onSelect?.({ from: date, to: date })
      } else {
        onSelect?.({ from, to: date })
      }
    } else if (mode === "multiple" && Array.isArray(selected)) {
      // Implement multiple selection logic
      const isAlreadySelected = selected.some((d) => d.toDateString() === date.toDateString())
      if (isAlreadySelected) {
        onSelect?.(selected.filter((d) => d.toDateString() !== date.toDateString()))
      } else {
        onSelect?.([...selected, date])
      }
    }
  }

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentMonth)
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    setCurrentMonth(prevMonth)
    onMonthChange?.(prevMonth)
  }

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setCurrentMonth(nextMonth)
    onMonthChange?.(nextMonth)
  }

  // Generate calendar days
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const days = []

  // Previous month days
  if (showOutsideDays) {
    const prevMonthDays = getDaysInMonth(year, month - 1)
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i)
      days.push({ date, isCurrentMonth: false })
    }
  } else {
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ date: null, isCurrentMonth: false })
    }
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i)
    days.push({ date, isCurrentMonth: true })
  }

  // Next month days to fill the calendar
  const remainingDays = 42 - days.length // 6 rows x 7 days
  if (showOutsideDays && remainingDays > 0) {
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i)
      days.push({ date, isCurrentMonth: false })
    }
  }

  // Group days into weeks
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent p-0" onClick={handlePreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">
          {monthNames[month]} {year}
        </div>
        <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent p-0" onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => {
              if (!day.date) {
                return <div key={dayIndex} className="h-9 w-9" />
              }

              const isSelected = isDateSelected(day.date)
              const isDisabled = isDateDisabled(day.date)
              const isToday = day.date.toDateString() === new Date().toDateString()

              return (
                <Button
                  key={dayIndex}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 p-0 font-normal",
                    !day.isCurrentMonth && "text-muted-foreground opacity-50",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    isToday && !isSelected && "bg-accent text-accent-foreground",
                    isDisabled && "opacity-50 cursor-not-allowed",
                  )}
                  disabled={isDisabled}
                  onClick={() => handleDateClick(day.date)}
                >
                  {day.date.getDate()}
                </Button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }