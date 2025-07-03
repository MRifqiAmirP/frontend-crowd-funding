"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/ui/page-transition"
import { MotionCard } from "@/components/ui/motion-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Search, Tag, User } from "lucide-react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample blog posts data
  const blogPosts = [
    {
      id: "1",
      title: "10 Ide Bisnis Inovatif untuk Pelajar dengan Modal Minim",
      excerpt:
        "Temukan ide-ide bisnis kreatif yang bisa dimulai dengan modal kecil namun berpotensi menghasilkan keuntungan yang menjanjikan.",
      image: "https://i.pinimg.com/736x/db/67/9c/db679c3c4895e5ed058c767dea0c0371.jpg",
      category: "Ide Bisnis",
      author: "Budi Santoso",
      date: "2023-05-15",
      readTime: "5 menit",
      tags: ["bisnis", "modal kecil", "inovasi"],
    },
    {
      id: "2",
      title: "Cara Membuat Pitch Deck yang Menarik untuk Investor",
      excerpt:
        "Panduan lengkap membuat presentasi pitch deck yang efektif untuk meyakinkan investor mendanai proyek riset dan penelitianmu.",
      image: "https://i.pinimg.com/736x/b8/e8/0a/b8e80a0d0587467b14b51d05712340d7.jpg",
      category: "Pitching",
      author: "Anisa Rahma",
      date: "2023-05-10",
      readTime: "8 menit",
      tags: ["pitch deck", "investor", "presentasi"],
    },
    {
      id: "3",
      title: "Mengelola Keuangan Bisnis untuk Pemula: Panduan Praktis",
      excerpt:
        "Pelajari dasar-dasar pengelolaan keuangan bisnis yang penting untuk keberlangsungan usaha jangka panjang.",
      image: "https://i.pinimg.com/736x/36/50/5a/36505a0e106218c673d4305745d99f12.jpg",
      category: "Keuangan",
      author: "Darmawan",
      date: "2023-05-05",
      readTime: "10 menit",
      tags: ["keuangan", "manajemen", "bisnis"],
    },
    {
      id: "4",
      title: "Strategi Digital Marketing untuk Bisnis Pelajar",
      excerpt:
        "Panduan lengkap memanfaatkan media sosial dan platform digital untuk mempromosikan bisnis dengan biaya minimal.",
      image: "https://i.pinimg.com/736x/99/34/06/99340685dcad4eed705980e2c0a9f2d1.jpg",
      category: "Marketing",
      author: "Siti Nurhaliza",
      date: "2023-04-28",
      readTime: "7 menit",
      tags: ["digital marketing", "media sosial", "promosi"],
    },
    {
      id: "5",
      title: "Kisah Sukses: Dari Proyek Sekolah Menjadi Startup Bernilai Miliaran",
      excerpt:
        "Cerita inspiratif dari alumni ProyekSiswa.id yang berhasil mengembangkan proyek sekolahnya menjadi startup sukses.",
      image: "https://i.pinimg.com/736x/6b/6c/35/6b6c3558f8aa6907acfcf130770fae33.jpg",
      category: "Inspirasi",
      author: "Tim Editorial",
      date: "2023-04-20",
      readTime: "6 menit",
      tags: ["kisah sukses", "startup", "inspirasi"],
    },
    {
      id: "6",
      title: "Membangun Personal Branding sebagai Young Entrepreneur",
      excerpt:
        "Tips dan strategi membangun personal branding yang kuat untuk meningkatkan kredibilitas dan peluang networking.",
      image: "https://i.pinimg.com/736x/da/2c/31/da2c31376ce181d50d7f2ce159a332e8.jpg",
      category: "Branding",
      author: "Reza Rahadian",
      date: "2023-04-15",
      readTime: "9 menit",
      tags: ["personal branding", "networking", "entrepreneur"],
    },
  ]

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  // Categories for filtering
  const categories = ["Semua", "Ide Bisnis", "Pitching", "Keuangan", "Marketing", "Inspirasi", "Branding"]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Blog & Edukasi Kewirausahaan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto mb-8"
          >
            Temukan artikel, tips, dan inspirasi untuk mengembangkan keterampilan kewirausahaanmu
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Cari artikel..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="Semua" className="mb-8">
            <TabsList className="mb-8 flex flex-wrap justify-center">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="data-[state=active]:bg-blue-100">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {blogPosts
                    .filter(
                      (post) =>
                        (category === "Semua" || post.category === category) &&
                        (searchQuery === "" ||
                          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())),
                    )
                    .map((post, index) => (
                      <Link key={post.id} href={`/blog/${post.id}`}>
                        <MotionCard delay={index} className="h-full flex flex-col hover:border-blue-200">
                          <div className="relative h-48">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              {post.category}
                            </div>
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                            <div className="mt-auto">
                              <div className="flex items-center text-sm text-gray-500 mb-2">
                                <User className="h-4 w-4 mr-1" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{formatDate(post.date)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{post.readTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </MotionCard>
                      </Link>
                    ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-center mt-12">
            <Button variant="outline">Muat Lebih Banyak</Button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Artikel Populer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Artikel pilihan yang paling banyak dibaca dan dibagikan oleh komunitas kami
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post, index) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <MotionCard delay={index} className="flex flex-col md:flex-row h-full">
                  <div className="relative md:w-2/5 h-48 md:h-auto">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-6 md:w-3/5">
                    <div className="text-blue-600 text-sm font-medium mb-2">{post.category}</div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span className="mr-4">{post.author}</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </MotionCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Topik Populer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Jelajahi artikel berdasarkan topik yang menarik bagi kamu</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {Array.from(new Set(blogPosts.flatMap((post) => post.tags))).map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 hover:bg-blue-100 px-4 py-2 rounded-full text-sm flex items-center"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
