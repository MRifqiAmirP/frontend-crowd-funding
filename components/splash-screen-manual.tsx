"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MotionButton } from "@/components/ui/motion-button"

export default function SplashScreenManual() {
  const [isVisible, setIsVisible] = useState(true)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8,
      },
    },
  }

  const dotVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 1.2,
      },
    },
  }

  const taglineVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="text-center relative z-10">
          {/* Main Logo Text */}
          <motion.div variants={textVariants} className="relative">
            <motion.h1
              variants={pulseVariants}
              animate="pulse"
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
              style={{
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              ProyekSiswa
              <motion.span variants={dotVariants} className="text-yellow-400">
                .
              </motion.span>
              <span className="text-blue-200">id</span>
            </motion.h1>

            {/* Glow Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-3xl -z-10"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={taglineVariants}
            className="text-xl md:text-2xl text-blue-100 font-light tracking-wide mb-8"
          >
            Wujudkan Idemu
          </motion.p>

          {/* Enter Button */}
          <motion.div variants={buttonVariants}>
            <MotionButton
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
              onClick={() => setIsVisible(false)}
            >
              Masuk ke Platform
            </MotionButton>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Floating Icons */}
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-8 h-8 bg-white/20 rounded-lg"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + index,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2.5 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={() => setIsVisible(false)}
          className="absolute bottom-8 right-8 text-white/70 hover:text-white text-sm underline"
        >
          Lewati
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
