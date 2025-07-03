"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface PortfolioCardProps {
  portfolio: {
    username: string
    name: string
    title: string
    avatar: string
    coverImage: string
    location: string
    rating: number
    projects: number
    followers: number
    skills: string[]
    bio: string
    verified: boolean
  }
  index?: number
}

export default function PortfolioCard({ portfolio, index = 0 }: PortfolioCardProps) {
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
    >
      <Link href={`/portfolio/${portfolio.username}`}>
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <div className="relative h-32">
            <Image
              src={portfolio.coverImage || "/placeholder.svg"}
              alt={`${portfolio.name} cover`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {portfolio.verified && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full">
                <Star className="h-3 w-3 fill-current" />
              </div>
            )}
          </div>

          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src={portfolio.avatar || "/placeholder.svg"}
                  alt={portfolio.name}
                  fill
                  className="rounded-full object-cover border-2 border-white shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">{portfolio.name}</h3>
                <p className="text-sm text-gray-600">{portfolio.title}</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{portfolio.bio}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {portfolio.location}
              </div>
              <div className="flex items-center">
                <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                {portfolio.rating}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div>
                <p className="font-semibold text-blue-600">{portfolio.projects}</p>
                <p className="text-xs text-gray-500">Proyek</p>
              </div>
              <div>
                <p className="font-semibold text-green-600">{portfolio.followers}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div>
                <p className="font-semibold text-purple-600">{portfolio.skills.length}</p>
                <p className="text-xs text-gray-500">Skills</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {portfolio.skills.slice(0, 3).map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {portfolio.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{portfolio.skills.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
