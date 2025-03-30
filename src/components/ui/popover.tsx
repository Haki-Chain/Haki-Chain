"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Simple popover implementation without dependencies
const PopoverContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLButtonElement>
}>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null },
})

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  )
}

export function PopoverTrigger({
  children,
  asChild,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { open, setOpen, triggerRef } = React.useContext(PopoverContext)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        setOpen(!open)
        if (children.props.onClick) {
          children.props.onClick(e)
        }
      },
      "aria-expanded": open,
      "aria-haspopup": "dialog",
      ...props,
    })
  }

  return (
    <button
      type="button"
      ref={triggerRef}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup="dialog"
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}

export function PopoverContent({
  children,
  className,
  align = "center",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" | "center" }) {
  const { open, setOpen, triggerRef } = React.useContext(PopoverContext)
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Close popover when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, setOpen, triggerRef])

  // Close popover when pressing escape
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (open && event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        align === "start" && "left-0",
        align === "center" && "left-1/2 -translate-x-1/2",
        align === "end" && "right-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Popover.displayName = "Popover"
PopoverTrigger.displayName = "PopoverTrigger"
PopoverContent.displayName = "PopoverContent"

