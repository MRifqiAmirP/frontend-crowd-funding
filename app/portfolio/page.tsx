"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Grid, List, Users, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/ui/page-transition"
import PortfolioCard from "@/components/portfolio-card"
import { getAllPortfolios } from "@/lib/portfolio-data"

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const portfolios = getAllPortfolios()

  // Filter and search logic
  const filteredPortfolios = portfolios.filter((portfolio) => {
    const matchesSearch =
      portfolio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "all" ||
      portfolio.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      portfolio.projects.some((project) => project.category === selectedCategory)

    const matchesLocation =
      selectedLocation === "all" || portfolio.location.toLowerCase().includes(selectedLocation.toLowerCase())

    return matchesSearch && matchesCategory && matchesLocation
  })

  // Sort logic
  const sortedPortfolios = [...filteredPortfolios].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.stats.rating - a.stats.rating
      case "projects":
        return b.stats.completedProjects - a.stats.completedProjects
      case "followers":
        return b.stats.followers - a.stats.followers
      case "funding":
        return b.stats.totalFunding - a.stats.totalFunding
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const categories = [
    { value: "all", label: "Semua Kategori" },
    { value: "entrepreneur", label: "Entrepreneur" },
    { value: "developer", label: "Developer" },
    { value: "designer", label: "Designer" },
    { value: "researcher", label: "Researcher" },
    { value: "social", label: "Social Impact" },
  ]

  const locations = [
    { value: "all", label: "Semua Lokasi" },
    { value: "jakarta", label: "Jakarta" },
    { value: "bandung", label: "Bandung" },
    { value: "yogyakarta", label: "Yogyakarta" },
    { value: "bali", label: "Bali" },
    { value: "solo", label: "Solo" },
  ]

  const sortOptions = [
    { value: "rating", label: "Rating Tertinggi" },
    { value: "projects", label: "Proyek Terbanyak" },
    { value: "followers", label: "Followers Terbanyak" },
    { value: "funding", label: "Funding Terbesar" },
    { value: "name", label: "Nama A-Z" },
  ]

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Portfolio Siswa</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Temukan talenta muda Indonesia yang berprestasi. Jelajahi portfolio, proyek, dan pencapaian dari
              siswa-siswa terbaik di berbagai bidang.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{portfolios.length}</p>
                <p className="text-sm text-gray-600">Portfolio Aktif</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {portfolios.reduce((sum, p) => sum + p.stats.completedProjects, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Proyek</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  Rp{portfolios.reduce((sum, p) => sum + p.stats.totalFunding, 0).toFixed(1)}M
                </p>
                <p className="text-sm text-gray-600">Total Funding</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {portfolios.reduce((sum, p) => sum + p.stats.followers, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Followers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari nama, keahlian, atau bidang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Lokasi" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== "all" || selectedLocation !== "all") && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Pencarian: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:bg-gray-200 rounded-full p-0.5">
                    ×
                  </button>
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {categories.find((c) => c.value === selectedCategory)?.label}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedLocation !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {locations.find((l) => l.value === selectedLocation)?.label}
                  <button
                    onClick={() => setSelectedLocation("all")}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">{sortedPortfolios.length} Portfolio Ditemukan</h2>
          </div>

          {sortedPortfolios.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Users className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada portfolio yang ditemukan</h3>
              <p className="text-gray-500 mb-4">Coba ubah filter pencarian atau kata kunci Anda</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedLocation("all")
                }}
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}
            >
              {sortedPortfolios.map((portfolio, index) => (
                <PortfolioCard
                  key={portfolio.id}
                  portfolio={{
                    username: portfolio.username,
                    name: portfolio.name,
                    title: portfolio.title,
                    avatar: portfolio.profileImage,
                    coverImage: portfolio.coverImage,
                    location: portfolio.location,
                    rating: portfolio.stats.rating,
                    projects: portfolio.stats.completedProjects,
                    followers: portfolio.stats.followers,
                    skills: portfolio.skills,
                    bio: portfolio.bio,
                    verified: portfolio.stats.rating >= 4.8,
                  }}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
