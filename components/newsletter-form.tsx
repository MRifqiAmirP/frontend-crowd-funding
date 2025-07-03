"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MotionButton } from "@/components/ui/motion-button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Berhasil berlangganan!",
        description: "Terima kasih telah berlangganan newsletter kami.",
      })
      setEmail("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2"
    >
      <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }} className="flex-1">
        <Input
          type="email"
          placeholder="Alamat email kamu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
      </motion.div>
      <MotionButton type="submit" disabled={isLoading}>
        {isLoading ? "Mendaftar..." : "Berlangganan"}
      </MotionButton>
    </motion.form>
  )
}
