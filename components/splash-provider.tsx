"use client"

import type React from "react"

import { useState, useEffect } from "react"
import SplashScreen from "./splash-screen"

interface SplashProviderProps {
  children: React.ReactNode
}

export default function SplashProvider({ children }: SplashProviderProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [hasShownSplash, setHasShownSplash] = useState(false)

  useEffect(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem("splashShown")
    if (splashShown) {
      setShowSplash(false)
      setHasShownSplash(true)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    setHasShownSplash(true)
    sessionStorage.setItem("splashShown", "true")
  }

  if (showSplash && !hasShownSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return <>{children}</>
}
