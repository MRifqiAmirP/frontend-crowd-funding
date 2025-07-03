"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, X } from "lucide-react"

interface VideoPlayerProps {
  videoUrl: string
  thumbnailUrl: string
  title: string
}

export default function VideoPlayer({ videoUrl, thumbnailUrl, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleClose = () => {
    setIsPlaying(false)
  }

  return (
    <div className="relative">
      {!isPlaying ? (
        <motion.div
          className="relative cursor-pointer group"
          onClick={handlePlay}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img src={thumbnailUrl || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover rounded-lg" />
          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center group-hover:bg-black/40 transition-colors">
            <motion.div className="bg-white/90 rounded-full p-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Play className="h-8 w-8 text-blue-600 ml-1" />
            </motion.div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-medium text-sm bg-black/50 px-3 py-1 rounded">{title}</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <motion.button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={handleClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-8 w-8" />
          </motion.button>
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src={videoUrl}
              title={title}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}
