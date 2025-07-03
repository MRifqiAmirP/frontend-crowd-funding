"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    image: string
    category: string
    school: string
    currentFunding: number
    targetFunding: number
    daysLeft: number
    backers: number
  }
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const percentFunded = Math.min(Math.round((project.currentFunding / project.targetFunding) * 100), 100)

  // Format currency to IDR
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.1,
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="relative h-48">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">{project.category}</div>
        <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">{project.school}</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          <Link href={`/projects/${project.id}`} className="hover:text-blue-600">
            {project.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">{formatCurrency(project.currentFunding)}</span>
            <span className="text-gray-500">
              {percentFunded}% dari {formatCurrency(project.targetFunding)}
            </span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentFunded}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.1 }}
            className="h-2 bg-blue-600 rounded"
            style={{ maxWidth: "100%" }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{project.daysLeft} hari lagi</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{project.backers} pendukung</span>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button className="w-full" asChild>
            <Link href={`/projects/${project.id}/payment`}>Dukung Proyek</Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
