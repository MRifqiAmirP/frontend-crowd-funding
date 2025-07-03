"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Plus,
  MessageCircle,
  Share2,
  Bookmark,
  Award,
  Star,
  Clock,
  Eye,
  ThumbsUp,
  BookOpen,
  Bell,
  Activity,
  Flame,
  Pin,
  CheckCircle,
  ArrowUp,
  Hash,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import IncubatorNav from "@/components/incubator-nav"
import {
  communityDiscussions,
  communityNews,
  categories,
  topContributors,
  trendingTopics,
  recentActivities,
} from "@/lib/community-data"

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [showFilters, setShowFilters] = useState(false)

  const communityStats = [
    { label: "Total Anggota", value: "2,450", icon: Users, change: "+12%" },
    { label: "Diskusi Aktif", value: "156", icon: MessageSquare, change: "+8%" },
    { label: "Riset Kolaboratif", value: "89", icon: TrendingUp, change: "+15%" },
    { label: "Event Bulanan", value: "12", icon: Calendar, change: "+3%" },
  ]

  // Filter and search logic
  const filteredDiscussions = useMemo(() => {
    let filtered = communityDiscussions

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((discussion) => {
        const categoryMap: { [key: string]: string[] } = {
          ai: ["Artificial Intelligence", "AI Ethics"],
          "renewable-energy": ["Renewable Energy"],
          healthcare: ["Healthcare"],
          materials: ["Materials Science"],
          iot: ["IoT"],
          blockchain: ["Blockchain"],
          funding: ["Funding"],
          collaboration: ["International Collaboration"],
          news: ["News"],
          tutorial: ["Tutorial"],
          announcement: ["Announcement"],
        }
        return categoryMap[selectedCategory]?.includes(discussion.category) || false
      })
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (discussion) =>
          discussion.title.toLowerCase().includes(query) ||
          discussion.content.toLowerCase().includes(query) ||
          discussion.author.name.toLowerCase().includes(query) ||
          discussion.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Sort discussions
    switch (sortBy) {
      case "latest":
        filtered.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
        break
      case "popular":
        filtered.sort((a, b) => b.stats.likes + b.stats.replies - (a.stats.likes + a.stats.replies))
        break
      case "most-replies":
        filtered.sort((a, b) => b.stats.replies - a.stats.replies)
        break
      case "most-views":
        filtered.sort((a, b) => b.stats.views - a.stats.views)
        break
      default:
        break
    }

    return filtered
  }, [selectedCategory, searchQuery, sortBy])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Baru saja"
    if (diffInHours < 24) return `${diffInHours} jam lalu`
    if (diffInHours < 48) return "Kemarin"
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "new_discussion":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "reply":
        return <MessageCircle className="h-4 w-4 text-green-500" />
      case "like":
        return <ThumbsUp className="h-4 w-4 text-red-500" />
      case "new_member":
        return <Users className="h-4 w-4 text-purple-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <IncubatorNav />

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl font-bold mb-4">Komunitas Riset & Inovasi</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan diskusi, berbagi pengetahuan, dan berkolaborasi dengan peneliti dari seluruh Indonesia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                <Plus className="h-5 w-5 mr-2" />
                Mulai Diskusi Baru
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-purple-700 hover:bg-white hover:text-purple-700"
              >
                <Bell className="h-5 w-5 mr-2" />
                Subscribe Updates
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {communityStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <div className="flex items-center justify-center mt-2">
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="discussions">Diskusi</TabsTrigger>
                <TabsTrigger value="news">Berita</TabsTrigger>
                <TabsTrigger value="events">Acara</TabsTrigger>
                <TabsTrigger value="resources">Sumber Daya</TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="mt-6">
                {/* Search, Filter, and Sort */}
                <div className="space-y-4 mb-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Cari diskusi, topik, atau author..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Urutkan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="latest">Terbaru</SelectItem>
                          <SelectItem value="popular">Terpopuler</SelectItem>
                          <SelectItem value="most-replies">Paling Banyak Reply</SelectItem>
                          <SelectItem value="most-views">Paling Banyak Dilihat</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className={showFilters ? "bg-purple-50 border-purple-200" : ""}
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {(selectedCategory !== "all" || searchQuery) && (
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory !== "all" && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {categories.find((c) => c.id === selectedCategory)?.name}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                        </Badge>
                      )}
                      {searchQuery && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Search: "{searchQuery}"
                          <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Categories */}
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
                          {categories.map((category) => (
                            <Button
                              key={category.id}
                              variant={selectedCategory === category.id ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedCategory(category.id)}
                              className="rounded-full"
                            >
                              {category.name}
                              <Badge variant="secondary" className="ml-2">
                                {category.count}
                              </Badge>
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-gray-600">
                    Menampilkan {filteredDiscussions.length} dari {communityDiscussions.length} diskusi
                  </p>
                  {filteredDiscussions.length === 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("all")
                        setSearchQuery("")
                      }}
                    >
                      Reset Filter
                    </Button>
                  )}
                </div>

                {/* Discussions */}
                <div className="space-y-6">
                  <AnimatePresence>
                    {filteredDiscussions.length === 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                        <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-xl font-semibold mb-2">Tidak ada diskusi ditemukan</h3>
                        <p className="text-gray-600 mb-6">Coba ubah filter atau kata kunci pencarian Anda</p>
                        <Button
                          onClick={() => {
                            setSelectedCategory("all")
                            setSearchQuery("")
                          }}
                        >
                          Reset Semua Filter
                        </Button>
                      </motion.div>
                    ) : (
                      filteredDiscussions.map((discussion, index) => (
                        <motion.div
                          key={discussion.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="hover:shadow-md transition-all duration-200 hover:border-purple-200">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        {discussion.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                                        {discussion.isHot && <Flame className="h-4 w-4 text-red-500" />}
                                        <Link
                                          href={`/incubator/community/discussion/${discussion.id}`}
                                          className="text-lg font-semibold hover:text-purple-600 cursor-pointer transition-colors"
                                        >
                                          {discussion.title}
                                        </Link>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <span className="font-medium">{discussion.author.name}</span>
                                        {discussion.author.verified && (
                                          <CheckCircle className="h-3 w-3 text-blue-500" />
                                        )}
                                        <Badge variant="outline" className="text-xs">
                                          {discussion.author.role}
                                        </Badge>
                                        <span>•</span>
                                        <span>{discussion.author.institution}</span>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                          <span>{discussion.author.reputation}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <Badge
                                      className={
                                        categories.find(
                                          (c) =>
                                            c.name.toLowerCase().includes(discussion.category.toLowerCase()) ||
                                            discussion.category.toLowerCase().includes(c.name.toLowerCase()),
                                        )?.color || "bg-gray-100"
                                      }
                                    >
                                      {discussion.category}
                                    </Badge>
                                  </div>

                                  <p className="text-gray-700 mb-4 line-clamp-3">{discussion.content}</p>

                                  {discussion.hasImage && discussion.image && (
                                    <div className="mb-4">
                                      <Image
                                        src={discussion.image || "/placeholder.svg"}
                                        alt="Discussion image"
                                        width={400}
                                        height={200}
                                        className="rounded-lg object-cover"
                                      />
                                    </div>
                                  )}

                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {discussion.tags.slice(0, 4).map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-xs cursor-pointer hover:bg-purple-100"
                                      >
                                        <Hash className="h-3 w-3 mr-1" />
                                        {tag}
                                      </Badge>
                                    ))}
                                    {discussion.tags.length > 4 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{discussion.tags.length - 4} lainnya
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                      <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                        <ThumbsUp className="h-4 w-4" />
                                        <span>{discussion.stats.likes}</span>
                                      </button>
                                      <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                        <MessageCircle className="h-4 w-4" />
                                        <span>{discussion.stats.replies}</span>
                                      </button>
                                      <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        <span>{discussion.stats.views}</span>
                                      </div>
                                      <button className="flex items-center gap-1 hover:text-yellow-600 transition-colors">
                                        <Bookmark className="h-4 w-4" />
                                        <span>{discussion.stats.bookmarks}</span>
                                      </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="text-xs text-gray-500">
                                        <Clock className="h-3 w-3 inline mr-1" />
                                        {formatDate(discussion.lastActivity)}
                                      </div>
                                      <Button variant="outline" size="sm">
                                        <Share2 className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" asChild>
                                        <Link href={`/incubator/community/discussion/${discussion.id}`}>
                                          Baca Selengkapnya
                                        </Link>
                                      </Button>
                                    </div>
                                  </div>

                                  {discussion.lastActivityBy && (
                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                      <p className="text-xs text-gray-500">
                                        Aktivitas terakhir oleh{" "}
                                        <span className="font-medium">{discussion.lastActivityBy}</span> •{" "}
                                        {formatDate(discussion.lastActivity)}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>

                {/* Load More */}
                {filteredDiscussions.length > 0 && (
                  <div className="text-center mt-8">
                    <Button variant="outline" size="lg">
                      Muat Lebih Banyak Diskusi
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="news" className="mt-6">
                <div className="space-y-6">
                  {communityNews.map((news) => (
                    <Card key={news.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Image
                            src={news.image || "/placeholder.svg"}
                            alt={news.title}
                            width={120}
                            height={80}
                            className="rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold hover:text-purple-600 cursor-pointer">
                                {news.title}
                              </h3>
                              <Badge variant="outline">{news.category}</Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{news.summary}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Sumber: {news.source}</span>
                              <span>{formatDate(news.date)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-6">
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Event Komunitas</h3>
                  <p className="text-gray-600 mb-6">Ikuti workshop, seminar, dan networking events</p>
                  <Button asChild>
                    <Link href="/incubator/events">Lihat Semua Event</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Sumber Daya Komunitas</h3>
                  <p className="text-gray-600 mb-6">Akses ke dokumen, template, dan panduan penelitian</p>
                  <Button>Jelajahi Sumber Daya</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Aktivitas Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 text-sm">
                        <p>
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-gray-600">{activity.action}</span>
                          {activity.target && (
                            <>
                              {" "}
                              <span className="font-medium text-purple-600 cursor-pointer hover:underline">
                                {activity.target.length > 40
                                  ? `${activity.target.substring(0, 40)}...`
                                  : activity.target}
                              </span>
                            </>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Topik Trending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm cursor-pointer hover:text-purple-600">#{topic.name}</p>
                        <p className="text-xs text-gray-500">{topic.posts} posts</p>
                      </div>
                      <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                        {topic.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Kontributor Teratas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.slice(0, 5).map((contributor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-sm">{contributor.name}</p>
                          {contributor.verified && <CheckCircle className="h-3 w-3 text-blue-500" />}
                        </div>
                        <p className="text-xs text-gray-600">{contributor.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {contributor.badge}
                          </Badge>
                          <span className="text-xs text-gray-500">{contributor.contributions} kontribusi</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Mulai Diskusi
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href="/incubator/events">
                      <Calendar className="h-4 w-4 mr-2" />
                      Buat Event
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Cari Kolaborator
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Join Group Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Panduan Komunitas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                    <p>Hormati sesama anggota komunitas</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                    <p>Berbagi pengetahuan dengan konstruktif</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                    <p>Gunakan tag yang relevan</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                    <p>Hindari spam dan konten tidak pantas</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Baca Lengkap
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
