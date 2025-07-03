"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  Search,
  Plus,
  Star,
  Bookmark,
  Share2,
  X,
  SlidersHorizontal,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import IncubatorNav from "@/components/incubator-nav"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedPricing, setSelectedPricing] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("date")
  const [showFilters, setShowFilters] = useState(false)

  const eventStats = [
    { label: "Total Acara", value: "42", icon: Calendar },
    { label: "Peserta Aktif", value: "2,150", icon: Users },
    { label: "Acara Bulan Ini", value: "12", icon: Clock },
    { label: "Rating Rata-rata", value: "4.8", icon: Star },
  ]

  const allEvents = [
    {
      id: "1",
      title: "AI Research Symposium 2024",
      description: "Simposium tahunan untuk membahas perkembangan terbaru dalam penelitian AI dan machine learning",
      date: "2024-03-25",
      time: "09:00 - 17:00",
      location: "Jakarta Convention Center",
      locationType: "Offline",
      type: "Conference",
      attendees: 245,
      maxAttendees: 300,
      price: "Gratis",
      priceType: "Free",
      organizer: "Indonesian AI Society",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
      tags: ["AI", "Research", "Networking", "Technology"],
      rating: 4.9,
      isBookmarked: false,
      speakers: [
        { name: "Dr. Sarah Wijaya", role: "AI Researcher" },
        { name: "Prof. Ahmad Fauzi", role: "Data Scientist" },
      ],
    },
    {
      id: "2",
      title: "Startup Pitch Night",
      description: "Malam presentasi startup untuk mendapatkan funding dari investor dan venture capital",
      date: "2024-03-28",
      time: "18:00 - 21:00",
      location: "Virtual Event",
      locationType: "Online",
      type: "Networking",
      attendees: 89,
      maxAttendees: 150,
      price: "Rp 50.000",
      priceType: "Paid",
      organizer: "TechHub Indonesia",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
      tags: ["Startup", "Funding", "Pitch", "Investment"],
      rating: 4.7,
      isBookmarked: true,
      speakers: [
        { name: "John Doe", role: "Venture Capitalist" },
        { name: "Jane Smith", role: "Startup Mentor" },
      ],
    },
    {
      id: "3",
      title: "Renewable Energy Workshop",
      description: "Workshop praktis tentang teknologi energi terbarukan dan implementasinya di Indonesia",
      date: "2024-04-02",
      time: "13:00 - 16:00",
      location: "Bandung Institute of Technology",
      locationType: "Offline",
      type: "Workshop",
      attendees: 67,
      maxAttendees: 80,
      price: "Rp 100.000",
      priceType: "Paid",
      organizer: "Green Energy Indonesia",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop",
      tags: ["Energy", "Workshop", "Sustainability", "Environment"],
      rating: 4.8,
      isBookmarked: false,
      speakers: [{ name: "Dr. Budi Santoso", role: "Energy Expert" }],
    },
    {
      id: "4",
      title: "Digital Health Innovation Summit",
      description: "Summit tentang inovasi teknologi kesehatan digital dan telemedicine di era modern",
      date: "2024-04-05",
      time: "08:30 - 17:30",
      location: "Surabaya Convention Hall",
      locationType: "Offline",
      type: "Conference",
      attendees: 180,
      maxAttendees: 250,
      price: "Rp 200.000",
      priceType: "Paid",
      organizer: "HealthTech Indonesia",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
      tags: ["Healthcare", "Digital", "Innovation", "Technology"],
      rating: 4.6,
      isBookmarked: false,
      speakers: [
        { name: "Dr. Lisa Hartono", role: "Digital Health Expert" },
        { name: "Prof. Michael Chen", role: "Telemedicine Specialist" },
      ],
    },
    {
      id: "5",
      title: "Fintech Networking Meetup",
      description: "Pertemuan informal untuk para profesional fintech dan startup finansial",
      date: "2024-04-08",
      time: "19:00 - 22:00",
      location: "Virtual Event",
      locationType: "Online",
      type: "Networking",
      attendees: 120,
      maxAttendees: 200,
      price: "Gratis",
      priceType: "Free",
      organizer: "Fintech Community",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      tags: ["Fintech", "Networking", "Finance", "Startup"],
      rating: 4.5,
      isBookmarked: true,
      speakers: [
        { name: "Alex Wijaya", role: "Fintech Founder" },
        { name: "Sarah Kim", role: "Investment Analyst" },
      ],
    },
    {
      id: "6",
      title: "IoT Development Workshop",
      description: "Workshop hands-on untuk pengembangan aplikasi Internet of Things (IoT)",
      date: "2024-04-12",
      time: "09:00 - 16:00",
      location: "Yogyakarta Tech Hub",
      locationType: "Offline",
      type: "Workshop",
      attendees: 45,
      maxAttendees: 60,
      price: "Rp 150.000",
      priceType: "Paid",
      organizer: "IoT Indonesia",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
      tags: ["IoT", "Development", "Hardware", "Programming"],
      rating: 4.7,
      isBookmarked: false,
      speakers: [{ name: "Eng. Rudi Setiawan", role: "IoT Engineer" }],
    },
    {
      id: "7",
      title: "EdTech Innovation Conference",
      description: "Konferensi tentang inovasi teknologi pendidikan dan pembelajaran digital",
      date: "2024-04-15",
      time: "08:00 - 17:00",
      location: "Bali International Convention Centre",
      locationType: "Offline",
      type: "Conference",
      attendees: 300,
      maxAttendees: 400,
      price: "Rp 250.000",
      priceType: "Paid",
      organizer: "EdTech Indonesia",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
      tags: ["Education", "Technology", "Learning", "Innovation"],
      rating: 4.8,
      isBookmarked: false,
      speakers: [
        { name: "Prof. Indira Sari", role: "Education Technology Expert" },
        { name: "Dr. Kevin Tan", role: "E-Learning Specialist" },
      ],
    },
    {
      id: "8",
      title: "Blockchain & Cryptocurrency Seminar",
      description: "Seminar mendalam tentang teknologi blockchain dan masa depan cryptocurrency",
      date: "2024-04-18",
      time: "14:00 - 18:00",
      location: "Virtual Event",
      locationType: "Online",
      type: "Seminar",
      attendees: 95,
      maxAttendees: 150,
      price: "Rp 75.000",
      priceType: "Paid",
      organizer: "Blockchain Indonesia",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
      tags: ["Blockchain", "Cryptocurrency", "Finance", "Technology"],
      rating: 4.4,
      isBookmarked: true,
      speakers: [{ name: "Daniel Crypto", role: "Blockchain Developer" }],
    },
  ]

  const eventTypes = [
    { id: "Conference", name: "Conference", count: 3 },
    { id: "Workshop", name: "Workshop", count: 2 },
    { id: "Networking", name: "Networking", count: 2 },
    { id: "Seminar", name: "Seminar", count: 1 },
  ]

  const locationTypes = [
    { id: "Online", name: "Online", count: 3 },
    { id: "Offline", name: "Offline", count: 5 },
  ]

  const pricingTypes = [
    { id: "Free", name: "Gratis", count: 2 },
    { id: "Paid", name: "Berbayar", count: 6 },
  ]

  const allTags = [
    { id: "AI", name: "AI", count: 1 },
    { id: "Technology", name: "Technology", count: 4 },
    { id: "Healthcare", name: "Healthcare", count: 2 },
    { id: "Startup", name: "Startup", count: 2 },
    { id: "Energy", name: "Energy", count: 1 },
    { id: "Finance", name: "Finance", count: 2 },
    { id: "Education", name: "Education", count: 2 },
    { id: "Blockchain", name: "Blockchain", count: 1 },
  ]

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const filtered = allEvents.filter((event) => {
      // Search query
      if (
        searchQuery &&
        !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(event.type)) {
        return false
      }

      // Location type filter
      if (selectedLocations.length > 0 && !selectedLocations.includes(event.locationType)) {
        return false
      }

      // Pricing filter
      if (selectedPricing.length > 0 && !selectedPricing.includes(event.priceType)) {
        return false
      }

      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some((tag) => event.tags.includes(tag))) {
        return false
      }

      return true
    })

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "rating":
          return b.rating - a.rating
        case "popularity":
          return b.attendees - a.attendees
        case "name":
          return a.title.localeCompare(b.title)
        case "price-low":
          const priceA = a.priceType === "Free" ? 0 : Number.parseInt(a.price.replace(/\D/g, "")) || 0
          const priceB = b.priceType === "Free" ? 0 : Number.parseInt(b.price.replace(/\D/g, "")) || 0
          return priceA - priceB
        case "price-high":
          const priceA2 = a.priceType === "Free" ? 0 : Number.parseInt(a.price.replace(/\D/g, "")) || 0
          const priceB2 = b.priceType === "Free" ? 0 : Number.parseInt(b.price.replace(/\D/g, "")) || 0
          return priceB2 - priceA2
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedTypes, selectedLocations, selectedPricing, selectedTags, sortBy])

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "conference":
        return "bg-blue-100 text-blue-800"
      case "workshop":
        return "bg-green-100 text-green-800"
      case "networking":
        return "bg-purple-100 text-purple-800"
      case "seminar":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const clearAllFilters = () => {
    setSelectedTypes([])
    setSelectedLocations([])
    setSelectedPricing([])
    setSelectedTags([])
    setSearchQuery("")
  }

  const activeFiltersCount =
    selectedTypes.length + selectedLocations.length + selectedPricing.length + selectedTags.length

  return (
    <div className="min-h-screen bg-gray-50">
      <IncubatorNav />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl font-bold mb-4">Acara & Event</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan berbagai acara menarik untuk mengembangkan jaringan dan pengetahuan Anda
            </p>
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Plus className="h-5 w-5 mr-2" />
              Buat Event Baru
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {eventStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Mendatang</TabsTrigger>
            <TabsTrigger value="past">Selesai</TabsTrigger>
            <TabsTrigger value="my-events">Event Saya</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-8">
            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Cari event berdasarkan nama, organizer, atau deskripsi..."
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
                    <SelectItem value="date">Tanggal Terdekat</SelectItem>
                    <SelectItem value="rating">Rating Tertinggi</SelectItem>
                    <SelectItem value="popularity">Paling Popular</SelectItem>
                    <SelectItem value="name">Nama A-Z</SelectItem>
                    <SelectItem value="price-low">Harga Terendah</SelectItem>
                    <SelectItem value="price-high">Harga Tertinggi</SelectItem>
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
                        <h3 className="font-semibold">Filter Event</h3>
                        {activeFiltersCount > 0 && (
                          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                            Clear All
                          </Button>
                        )}
                      </div>

                      {/* Type Filter */}
                      <div>
                        <h4 className="font-medium mb-3">Tipe Event</h4>
                        <div className="space-y-2">
                          {eventTypes.map((type) => (
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

                      {/* Location Type Filter */}
                      <div>
                        <h4 className="font-medium mb-3">Format Acara</h4>
                        <div className="space-y-2">
                          {locationTypes.map((location) => (
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

                      {/* Pricing Filter */}
                      <div>
                        <h4 className="font-medium mb-3">Harga</h4>
                        <div className="space-y-2">
                          {pricingTypes.map((pricing) => (
                            <div key={pricing.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={pricing.id}
                                checked={selectedPricing.includes(pricing.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedPricing([...selectedPricing, pricing.id])
                                  } else {
                                    setSelectedPricing(selectedPricing.filter((p) => p !== pricing.id))
                                  }
                                }}
                              />
                              <label htmlFor={pricing.id} className="text-sm flex-1 cursor-pointer">
                                {pricing.name} ({pricing.count})
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Tags Filter */}
                      <div>
                        <h4 className="font-medium mb-3">Kategori</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {allTags.map((tag) => (
                            <div key={tag.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={tag.id}
                                checked={selectedTags.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedTags([...selectedTags, tag.id])
                                  } else {
                                    setSelectedTags(selectedTags.filter((t) => t !== tag.id))
                                  }
                                }}
                              />
                              <label htmlFor={tag.id} className="text-sm flex-1 cursor-pointer">
                                {tag.name} ({tag.count})
                              </label>
                            </div>
                          ))}
                        </div>
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
                {selectedPricing.map((pricing) => (
                  <Badge key={pricing} variant="secondary" className="px-3 py-1">
                    💰 {pricing === "Free" ? "Gratis" : "Berbayar"}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => setSelectedPricing(selectedPricing.filter((p) => p !== pricing))}
                    />
                  </Badge>
                ))}
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    🏷️ {tag}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Menampilkan {filteredEvents.length} dari {allEvents.length} event
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      <div className="absolute top-4 left-4">
                        <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                          <Bookmark className={`h-4 w-4 ${event.isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-white">{event.rating}</span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge
                          variant={event.locationType === "Online" ? "secondary" : "outline"}
                          className="bg-white/90"
                        >
                          {event.locationType}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                      <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.attendees}/{event.maxAttendees} peserta
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-sm font-medium">Speakers:</p>
                            <div className="text-xs text-gray-600">
                              {event.speakers.map((speaker, idx) => (
                                <span key={idx}>
                                  {speaker.name}
                                  {idx < event.speakers.length - 1 && ", "}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">{event.price}</p>
                            <p className="text-xs text-gray-500">by {event.organizer}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Daftar Sekarang
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/incubator/events/${event.id}`}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Tidak ada event ditemukan</h3>
                <p className="text-gray-600 mb-6">Coba ubah filter atau kata kunci pencarian Anda</p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Reset Filter
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredEvents.length > 0 && filteredEvents.length >= 6 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Muat Lebih Banyak
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-8">
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Event yang Telah Selesai</h3>
              <p className="text-gray-600 mb-6">Lihat rekaman dan materi dari event sebelumnya</p>
              <Button variant="outline">Jelajahi Arsip</Button>
            </div>
          </TabsContent>

          <TabsContent value="my-events" className="mt-8">
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Event Saya</h3>
              <p className="text-gray-600 mb-6">Kelola event yang Anda buat atau ikuti</p>
              <div className="flex gap-4 justify-center">
                <Button>Buat Event Baru</Button>
                <Button variant="outline">Event Terdaftar</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
