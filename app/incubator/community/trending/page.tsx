"use client"

import { motion } from "framer-motion"
import { TrendingUp, FlameIcon as Fire, Clock, Eye, MessageCircle, ThumbsUp } from "lucide-react"
import IncubatorNav from "@/components/incubator-nav"
import CommunitySidebar from "@/components/community-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function TrendingPage() {
  const trendingDiscussions = [
    {
      id: "1",
      title: "Breakthrough dalam AI untuk Healthcare - Diskusi Hasil Riset Terbaru",
      author: {
        name: "Dr. Sarah Wijaya",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        role: "AI Researcher",
      },
      category: "Artificial Intelligence",
      stats: {
        likes: 89,
        replies: 34,
        views: 1250,
        trending_score: 95,
      },
      createdAt: "3 jam lalu",
      isHot: true,
      excerpt:
        "Tim kami berhasil mengembangkan model AI yang dapat mendeteksi kanker dengan akurasi 97%. Mari diskusikan implikasi dan potensi pengembangannya...",
    },
    {
      id: "2",
      title: "Kolaborasi Internasional: Peluang Riset Bersama Universitas MIT",
      author: {
        name: "Prof. Ahmad Fauzi",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Energy Researcher",
      },
      category: "Collaboration",
      stats: {
        likes: 67,
        replies: 28,
        views: 890,
        trending_score: 88,
      },
      createdAt: "5 jam lalu",
      isHot: true,
      excerpt:
        "MIT membuka program kolaborasi riset untuk renewable energy. Ada yang tertarik bergabung? Deadline aplikasi 2 minggu lagi...",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <IncubatorNav />

      <div className="flex">
        <div className="hidden lg:block">
          <CommunitySidebar />
        </div>

        <div className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Diskusi Trending</h1>
                  <p className="text-gray-600">Topik paling populer minggu ini</p>
                </div>
              </div>
            </div>

            {/* Trending Discussions */}
            <div className="space-y-6">
              {trendingDiscussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold mb-1 hover:text-purple-600 cursor-pointer">
                                {discussion.title}
                                {discussion.isHot && (
                                  <Badge className="ml-2 bg-red-100 text-red-800">
                                    <Fire className="h-3 w-3 mr-1" />
                                    Hot
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-medium">{discussion.author.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {discussion.author.role}
                                </Badge>
                                <span>•</span>
                                <Clock className="h-3 w-3" />
                                <span>{discussion.createdAt}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge>{discussion.category}</Badge>
                              <div className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                <TrendingUp className="h-3 w-3" />
                                {discussion.stats.trending_score}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{discussion.excerpt}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{discussion.stats.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{discussion.stats.replies}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{discussion.stats.views}</span>
                              </div>
                            </div>
                            <Button size="sm">Baca Selengkapnya</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
