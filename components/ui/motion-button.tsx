"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"

export const MotionButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, ...props }, ref) => {
  return (
    <Button ref={ref} className={className} {...props} asChild>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
      >
        {children}
      </motion.button>
    </Button>
  )
})
MotionButton.displayName = "MotionButton"
