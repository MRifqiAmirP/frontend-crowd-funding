"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Users, TrendingUp, BookOpen, DollarSign, Search, Filter, Star, Calendar, MapPin, Eye } from "lucide-react"
import { MotionButton } from "@/components/ui/motion-button"
import { PageTransition } from "@/components/ui/page-transition"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IncubatorNav from "@/components/incubator-nav"

export default function IncubatorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const stats = [
    { label: "Peneliti Aktif", value: "150+", icon: Users },
    { label: "Proyek Riset", value: "89", icon: BookOpen },
    { label: "Pendana", value: "45", icon: DollarSign },
    { label: "Dana Tersalurkan", value: "Rp 2.8M", icon: TrendingUp },
  ]

  const featuredResearch = [
    {
      id: "1",
      title: "AI untuk Deteksi Dini Penyakit Tanaman",
      researcher: "Dr. Sari Indrawati",
      institution: "Institut Teknologi Bandung",
      category: "Artificial Intelligence",
      funding: 150000000,
      targetFunding: 200000000,
      backers: 12,
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop",
      description: "Mengembangkan sistem AI untuk mendeteksi penyakit tanaman secara dini menggunakan computer vision",
      tags: ["AI", "Agriculture", "Computer Vision"],
      stage: "Prototype",
      duration: "18 bulan",
      location: "Bandung",
      rating: 4.8,
      views: 1250,
    },
    {
      id: "2",
      title: "Biofilter dari Limbah Organik untuk Air Bersih",
      researcher: "Prof. Ahmad Fauzi",
      institution: "Universitas Gadjah Mada",
      category: "Environmental Science",
      funding: 85000000,
      targetFunding: 120000000,
      backers: 8,
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
      description: "Penelitian pengembangan biofilter dari limbah organik untuk menghasilkan air bersih",
      tags: ["Environment", "Water Treatment", "Sustainability"],
      stage: "Research",
      duration: "24 bulan",
      location: "Yogyakarta",
      rating: 4.6,
      views: 980,
    },
    {
      id: "3",
      title: "Nanomaterial untuk Solar Cell Efisiensi Tinggi",
      researcher: "Dr. Budi Santoso",
      institution: "Universitas Indonesia",
      category: "Renewable Energy",
      funding: 200000000,
      targetFunding: 300000000,
      backers: 15,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
      description: "Pengembangan nanomaterial baru untuk meningkatkan efisiensi solar cell hingga 25%",
      tags: ["Nanotechnology", "Solar Energy", "Materials Science"],
      stage: "Development",
      duration: "30 bulan",
      location: "Jakarta",
      rating: 4.9,
      views: 1580,
    },
  ]

  const categories = [
    { id: "all", name: "Semua Kategori", count: 89 },
    { id: "ai", name: "Artificial Intelligence", count: 23 },
    { id: "biotech", name: "Biotechnology", count: 18 },
    { id: "energy", name: "Renewable Energy", count: 15 },
    { id: "environment", name: "Environmental Science", count: 12 },
    { id: "health", name: "Healthcare", count: 21 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  }

  return (
    <PageTransition>
      <IncubatorNav />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-yellow-300">Incubator</span> Riset & Inovasi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed"
            >
              Platform kolaborasi untuk menghubungkan peneliti, pendana, dan komunitas dalam mengembangkan inovasi yang
              berdampak
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MotionButton size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                <Link href="/incubator/submit-research">Submit Riset</Link>
              </MotionButton>
              <MotionButton size="lg" variant="outline" className="border-white text-purple-700 hover:bg-white/10">
                <Link href="/incubator/become-funder">Jadi Pendana</Link>
              </MotionButton>
              <MotionButton size="lg" variant="outline" className="border-white text-purple-700 hover:bg-white/10">
                <Link href="/incubator/explore">Jelajahi Riset</Link>
              </MotionButton>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 sm:mt-20"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
                  <p className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-blue-100">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="research" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="research" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Riset Aktif</span>
                <span className="sm:hidden">Riset</span>
              </TabsTrigger>
              <TabsTrigger value="funders" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Pendana</span>
                <span className="sm:hidden">Pendana</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Komunitas</span>
                <span className="sm:hidden">Komunitas</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="research" className="mt-8">
              {/* Search and Filter */}
              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Cari riset berdasarkan judul, peneliti, atau institusi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button variant="outline" className="h-12 px-6">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-8">
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

              {/* Featured Research */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
              >
                {featuredResearch.map((research, index) => (
                  <motion.div key={research.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={research.image || "/placeholder.svg"}
                          alt={research.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-gray-800">{research.stage}</Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                          <Eye className="h-3 w-3 text-white" />
                          <span className="text-xs text-white">{research.views}</span>
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-white">{research.rating}</span>
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg leading-tight line-clamp-2">{research.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium">{research.researcher}</span>
                          <span>•</span>
                          <span>{research.institution}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{research.description}</p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {research.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress Pendanaan</span>
                            <span className="font-medium">
                              {Math.round((research.funding / research.targetFunding) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min((research.funding / research.targetFunding) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-purple-600">
                              Rp {(research.funding / 1000000).toFixed(1)}M
                            </span>
                            <span className="text-gray-600">
                              dari Rp {(research.targetFunding / 1000000).toFixed(1)}M
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{research.backers} pendana</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{research.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{research.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button asChild className="flex-1" size="sm">
                            <Link href={`/incubator/research/${research.id}`}>Lihat Detail</Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Link href={`/incubator/research/${research.id}/fund`}>Danai</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="funders" className="mt-8">
              <div className="text-center py-12">
                <DollarSign className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Daftar Pendana</h3>
                <p className="text-gray-600 mb-6">Temukan pendana yang sesuai dengan riset Anda</p>
                <Button asChild>
                  <Link href="/incubator/funders">Lihat Semua Pendana</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-8">
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Komunitas Riset</h3>
                <p className="text-gray-600 mb-6">Bergabung dengan diskusi dan kolaborasi</p>
                <Button asChild>
                  <Link href="/incubator/community">Masuk Komunitas</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Bagaimana Incubator Bekerja?</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Proses sederhana untuk menghubungkan peneliti dengan pendana dan komunitas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Submit Riset",
                description: "Peneliti mengajukan proposal riset dengan detail lengkap dan target pendanaan",
                icon: BookOpen,
              },
              {
                step: "02",
                title: "Review & Matching",
                description: "Tim ahli melakukan review dan mencocokkan dengan pendana yang sesuai",
                icon: Users,
              },
              {
                step: "03",
                title: "Kolaborasi & Funding",
                description: "Mulai kolaborasi, dapatkan pendanaan, dan kembangkan riset bersama komunitas",
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-800">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Siap Bergabung dengan Ekosistem Riset?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Mulai perjalanan riset Anda atau dukung inovasi yang mengubah dunia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MotionButton size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                <Link href="/incubator/dashboard">Dashboard</Link>
              </MotionButton>
              <MotionButton size="lg" variant="outline" className="border-white text-blue-700 hover:bg-white/10">
                <Link href="/incubator/about">Pelajari Lebih Lanjut</Link>
              </MotionButton>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
