"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  DollarSign,
  TrendingUp,
  Users,
  Award,
  Search,
  MapPin,
  Calendar,
  Star,
  Globe,
  Mail,
  Phone,
  X,
  SlidersHorizontal,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import IncubatorNav from "@/components/incubator-nav"

export default function FundersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([])
  const [investmentRange, setInvestmentRange] = useState([0, 2000])
  const [minSuccessRate, setMinSuccessRate] = useState(0)
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)

  const funderStats = [
    { label: "Total Pendana", value: "78", icon: Users },
    { label: "Dana Tersalurkan", value: "Rp 15.2M", icon: DollarSign },
    { label: "Riset Didanai", value: "234", icon: TrendingUp },
    { label: "ROI Rata-rata", value: "22.3%", icon: Award },
  ]

  const allFunders = [
    {
      id: "1",
      name: "PT. Tech Innovate Indonesia",
      type: "Corporate",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      description: "Perusahaan teknologi yang fokus pada inovasi AI dan IoT untuk industri pertanian dan kesehatan.",
      location: "Jakarta",
      founded: "2018",
      totalInvestment: 850,
      activeInvestments: 12,
      successRate: 85,
      focusAreas: ["Artificial Intelligence", "IoT", "Agriculture", "Healthcare"],
      rating: 4.8,
      reviews: 24,
    },
    {
      id: "2",
      name: "Innovation Fund Indonesia",
      type: "Government",
      logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop",
      description:
        "Dana pemerintah untuk mendukung riset dan inovasi teknologi yang berdampak pada masyarakat Indonesia.",
      location: "Jakarta",
      founded: "2015",
      totalInvestment: 1200,
      activeInvestments: 18,
      successRate: 78,
      focusAreas: ["Renewable Energy", "Biotechnology", "Education Technology", "Smart City"],
      rating: 4.6,
      reviews: 31,
    },
    {
      id: "3",
      name: "AgriTech Ventures",
      type: "VC",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
      description: "Venture capital yang mengkhususkan diri pada investasi teknologi pertanian dan food tech.",
      location: "Surabaya",
      founded: "2020",
      totalInvestment: 450,
      activeInvestments: 8,
      successRate: 92,
      focusAreas: ["Agriculture Technology", "Food Technology", "Supply Chain", "Sustainability"],
      rating: 4.9,
      reviews: 16,
    },
    {
      id: "4",
      name: "Green Energy Partners",
      type: "Private",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
      description: "Investor swasta yang fokus pada proyek energi terbarukan dan teknologi ramah lingkungan.",
      location: "Bandung",
      founded: "2019",
      totalInvestment: 320,
      activeInvestments: 6,
      successRate: 88,
      focusAreas: ["Renewable Energy", "Clean Technology", "Environmental Science", "Sustainability"],
      rating: 4.7,
      reviews: 19,
    },
    {
      id: "5",
      name: "Digital Health Ventures",
      type: "VC",
      logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop",
      description: "Venture capital yang fokus pada inovasi teknologi kesehatan digital dan telemedicine.",
      location: "Jakarta",
      founded: "2021",
      totalInvestment: 680,
      activeInvestments: 14,
      successRate: 89,
      focusAreas: ["Healthcare Technology", "Telemedicine", "Medical Devices", "Biotechnology"],
      rating: 4.8,
      reviews: 22,
    },
    {
      id: "6",
      name: "Fintech Innovation Fund",
      type: "Corporate",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
      description: "Dana investasi dari bank terkemuka untuk mendukung inovasi teknologi finansial.",
      location: "Jakarta",
      founded: "2017",
      totalInvestment: 950,
      activeInvestments: 20,
      successRate: 82,
      focusAreas: ["Financial Technology", "Blockchain", "Digital Payment", "Cryptocurrency"],
      rating: 4.5,
      reviews: 35,
    },
    {
      id: "7",
      name: "EduTech Accelerator",
      type: "Government",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
      description: "Program akselerator pemerintah untuk startup dan riset di bidang teknologi pendidikan.",
      location: "Yogyakarta",
      founded: "2019",
      totalInvestment: 380,
      activeInvestments: 11,
      successRate: 75,
      focusAreas: ["Education Technology", "E-Learning", "Digital Literacy", "Online Assessment"],
      rating: 4.4,
      reviews: 18,
    },
    {
      id: "8",
      name: "Smart City Solutions",
      type: "Private",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      description: "Investor swasta yang mengkhususkan diri pada solusi teknologi untuk smart city.",
      location: "Medan",
      founded: "2020",
      totalInvestment: 520,
      activeInvestments: 9,
      successRate: 86,
      focusAreas: ["Smart City", "IoT", "Urban Planning", "Transportation Technology"],
      rating: 4.6,
      reviews: 14,
    },
    {
      id: "9",
      name: "Maritime Tech Fund",
      type: "Corporate",
      logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop",
      description: "Dana investasi untuk teknologi maritim dan industri kelautan Indonesia.",
      location: "Makassar",
      founded: "2018",
      totalInvestment: 420,
      activeInvestments: 7,
      successRate: 91,
      focusAreas: ["Maritime Technology", "Ocean Engineering", "Fisheries Technology", "Port Management"],
      rating: 4.7,
      reviews: 12,
    },
    {
      id: "10",
      name: "Renewable Energy Consortium",
      type: "Government",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
      description: "Konsorsium pemerintah dan swasta untuk pengembangan energi terbarukan di Indonesia.",
      location: "Bali",
      founded: "2016",
      totalInvestment: 1500,
      activeInvestments: 25,
      successRate: 79,
      focusAreas: ["Solar Energy", "Wind Energy", "Hydroelectric", "Geothermal"],
      rating: 4.5,
      reviews: 28,
    },
  ]

  const funderTypes = [
    { id: "Corporate", name: "Corporate", count: 3 },
    { id: "Government", name: "Government", count: 3 },
    { id: "VC", name: "Venture Capital", count: 2 },
    { id: "Private", name: "Private Investor", count: 2 },
  ]

  const locations = [
    { id: "Jakarta", name: "Jakarta", count: 4 },
    { id: "Surabaya", name: "Surabaya", count: 1 },
    { id: "Bandung", name: "Bandung", count: 1 },
    { id: "Yogyakarta", name: "Yogyakarta", count: 1 },
    { id: "Medan", name: "Medan", count: 1 },
    { id: "Makassar", name: "Makassar", count: 1 },
    { id: "Bali", name: "Bali", count: 1 },
  ]

  const focusAreas = [
    { id: "Artificial Intelligence", name: "Artificial Intelligence", count: 1 },
    { id: "Healthcare", name: "Healthcare", count: 2 },
    { id: "Renewable Energy", name: "Renewable Energy", count: 3 },
    { id: "Agriculture Technology", name: "Agriculture Technology", count: 2 },
    { id: "Education Technology", name: "Education Technology", count: 2 },
    { id: "Financial Technology", name: "Financial Technology", count: 1 },
    { id: "Smart City", name: "Smart City", count: 2 },
    { id: "Maritime Technology", name: "Maritime Technology", count: 1 },
  ]

  // Filter and sort funders
  const filteredFunders = useMemo(() => {
    const filtered = allFunders.filter((funder) => {
      // Search query
      if (
        searchQuery &&
        !funder.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !funder.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !funder.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(funder.type)) {
        return false
      }

      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.includes(funder.location)) {
        return false
      }

      // Focus area filter
      if (selectedFocusAreas.length > 0 && !selectedFocusAreas.some((area) => funder.focusAreas.includes(area))) {
        return false
      }

      // Investment range filter
      if (funder.totalInvestment < investmentRange[0] || funder.totalInvestment > investmentRange[1]) {
        return false
      }

      // Success rate filter
      if (funder.successRate < minSuccessRate) {
        return false
      }

      return true
    })

    // Sort funders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "investment":
          return b.totalInvestment - a.totalInvestment
        case "success-rate":
          return b.successRate - a.successRate
        case "name":
          return a.name.localeCompare(b.name)
        case "newest":
          return Number.parseInt(b.founded) - Number.parseInt(a.founded)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedTypes, selectedLocations, selectedFocusAreas, investmentRange, minSuccessRate, sortBy])

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "corporate":
        return "bg-blue-100 text-blue-800"
      case "government":
        return "bg-green-100 text-green-800"
      case "vc":
        return "bg-purple-100 text-purple-800"
      case "private":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const clearAllFilters = () => {
    setSelectedTypes([])
    setSelectedLocations([])
    setSelectedFocusAreas([])
    setInvestmentRange([0, 2000])
    setMinSuccessRate(0)
    setSearchQuery("")
  }

  const activeFiltersCount =
    selectedTypes.length +
    selectedLocations.length +
    selectedFocusAreas.length +
    (investmentRange[0] > 0 || investmentRange[1] < 2000 ? 1 : 0) +
    (minSuccessRate > 0 ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <IncubatorNav />

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl font-bold mb-4">Pendana & Investor</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Temukan pendana yang tepat untuk riset dan inovasi Anda
            </p>
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
              <Link href="/incubator/submit-research">Submit Proposal</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {funderStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Cari pendana berdasarkan nama, fokus area, atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-12">
                <SelectValue placeholder="Urutkan berdasarkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
                <SelectItem value="investment">Investasi Terbesar</SelectItem>
                <SelectItem value="success-rate">Success Rate</SelectItem>
                <SelectItem value="name">Nama A-Z</SelectItem>
                <SelectItem value="newest">Terbaru</SelectItem>
              </SelectContent>
            </Select>

            <Popover open={showFilters} onOpenChange={setShowFilters}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-12 px-6 relative">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filter
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-blue-600 text-white">{activeFiltersCount}</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-6" align="end">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Filter Pendana</h3>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                        Clear All
                      </Button>
                    )}
                  </div>

                  {/* Type Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Tipe Pendana</h4>
                    <div className="space-y-2">
                      {funderTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={type.id}
                            checked={selectedTypes.includes(type.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTypes([...selectedTypes, type.id])
                              } else {
                                setSelectedTypes(selectedTypes.filter((t) => t !== type.id))
                              }
                            }}
                          />
                          <label htmlFor={type.id} className="text-sm flex-1 cursor-pointer">
                            {type.name} ({type.count})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Location Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Lokasi</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {locations.map((location) => (
                        <div key={location.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={location.id}
                            checked={selectedLocations.includes(location.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedLocations([...selectedLocations, location.id])
                              } else {
                                setSelectedLocations(selectedLocations.filter((l) => l !== location.id))
                              }
                            }}
                          />
                          <label htmlFor={location.id} className="text-sm flex-1 cursor-pointer">
                            {location.name} ({location.count})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Focus Area Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Fokus Area</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {focusAreas.map((area) => (
                        <div key={area.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={area.id}
                            checked={selectedFocusAreas.includes(area.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFocusAreas([...selectedFocusAreas, area.id])
                              } else {
                                setSelectedFocusAreas(selectedFocusAreas.filter((a) => a !== area.id))
                              }
                            }}
                          />
                          <label htmlFor={area.id} className="text-sm flex-1 cursor-pointer">
                            {area.name} ({area.count})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Investment Range */}
                  <div>
                    <h4 className="font-medium mb-3">
                      Range Investasi (Rp {investmentRange[0]}M - Rp {investmentRange[1]}M)
                    </h4>
                    <Slider
                      value={investmentRange}
                      onValueChange={setInvestmentRange}
                      max={2000}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                  </div>

                  <Separator />

                  {/* Success Rate */}
                  <div>
                    <h4 className="font-medium mb-3">Min. Success Rate ({minSuccessRate}%)</h4>
                    <Slider
                      value={[minSuccessRate]}
                      onValueChange={(value) => setMinSuccessRate(value[0])}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedTypes.map((type) => (
              <Badge key={type} variant="secondary" className="px-3 py-1">
                {type}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => setSelectedTypes(selectedTypes.filter((t) => t !== type))}
                />
              </Badge>
            ))}
            {selectedLocations.map((location) => (
              <Badge key={location} variant="secondary" className="px-3 py-1">
                📍 {location}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => setSelectedLocations(selectedLocations.filter((l) => l !== location))}
                />
              </Badge>
            ))}
            {selectedFocusAreas.map((area) => (
              <Badge key={area} variant="secondary" className="px-3 py-1">
                🎯 {area}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => setSelectedFocusAreas(selectedFocusAreas.filter((a) => a !== area))}
                />
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Menampilkan {filteredFunders.length} dari {allFunders.length} pendana
          </p>
        </div>

        {/* Funders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFunders.map((funder, index) => (
            <motion.div
              key={funder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={funder.logo || "/placeholder.svg"} />
                      <AvatarFallback>{funder.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-1">{funder.name}</CardTitle>
                          <Badge className={getTypeColor(funder.type)}>{funder.type}</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{funder.rating}</span>
                          <span className="text-sm text-gray-500">({funder.reviews})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{funder.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Since {funder.founded}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-2">{funder.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">Rp {funder.totalInvestment}M</p>
                      <p className="text-xs text-gray-600">Total Investasi</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{funder.activeInvestments}</p>
                      <p className="text-xs text-gray-600">Investasi Aktif</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">{funder.successRate}%</p>
                      <p className="text-xs text-gray-600">Success Rate</p>
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Fokus Area:</h4>
                    <div className="flex flex-wrap gap-1">
                      {funder.focusAreas.slice(0, 3).map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                      {funder.focusAreas.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{funder.focusAreas.length - 3} lainnya
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm">Kontak:</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Globe className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/incubator/funders/${funder.id}`}>Lihat Detail</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Hubungi
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFunders.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Tidak ada pendana ditemukan</h3>
            <p className="text-gray-600 mb-6">Coba ubah filter atau kata kunci pencarian Anda</p>
            <Button variant="outline" onClick={clearAllFilters}>
              Reset Filter
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredFunders.length > 0 && filteredFunders.length >= 10 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Muat Lebih Banyak
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
