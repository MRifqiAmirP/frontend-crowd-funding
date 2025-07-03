"use client"

import type React from "react"

import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>{children}</div>
    </AnimatePresence>
  )
}
