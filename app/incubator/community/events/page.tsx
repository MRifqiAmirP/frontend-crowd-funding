"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react"
import IncubatorNav from "@/components/incubator-nav"
import CommunitySidebar from "@/components/community-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: "1",
      title: "AI Research Symposium 2024",
      description: "Simposium tahunan untuk membahas perkembangan terbaru dalam penelitian AI",
      date: "2024-03-25",
      time: "09:00 - 17:00",
      location: "Jakarta Convention Center",
      type: "Conference",
      attendees: 245,
      maxAttendees: 300,
      price: "Gratis",
      organizer: "Indonesian AI Society",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
      tags: ["AI", "Research", "Networking"],
    },
    {
      id: "2",
      title: "Startup Pitch Night",
      description: "Malam presentasi startup untuk mendapatkan funding dari investor",
      date: "2024-03-28",
      time: "18:00 - 21:00",
      location: "Virtual Event",
      type: "Networking",
      attendees: 89,
      maxAttendees: 150,
      price: "Rp 50.000",
      organizer: "TechHub Indonesia",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
      tags: ["Startup", "Funding", "Pitch"],
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
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Acara Komunitas</h1>
                  <p className="text-gray-600">Event dan webinar untuk komunitas riset</p>
                </div>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-800">{event.type}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">{event.price}</Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                    </CardHeader>

                    <CardContent>
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
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">by {event.organizer}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button size="sm">Daftar Sekarang</Button>
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
