"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MotionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
}

export function MotionCard({ className, children, delay = 0, ...props }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay * 0.1,
      }}
      className={cn("bg-white rounded-lg shadow-md overflow-hidden", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
