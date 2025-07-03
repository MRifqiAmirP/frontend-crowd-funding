"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BarChart3,
  BookOpen,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Plus,
  Settings,
  TrendingUp,
  Users,
  Bell,
  Eye,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import IncubatorNav from "@/components/incubator-nav"

export default function IncubatorDashboard() {
  const [userRole, setUserRole] = useState<"researcher" | "funder" | "public">("researcher")

  const stats = {
    researcher: [
      { label: "Riset Aktif", value: "3", icon: BookOpen, color: "text-blue-600" },
      { label: "Total Pendanaan", value: "Rp 450M", icon: DollarSign, color: "text-green-600" },
      { label: "Kolaborator", value: "12", icon: Users, color: "text-purple-600" },
      { label: "Publikasi", value: "8", icon: FileText, color: "text-orange-600" },
    ],
    funder: [
      { label: "Investasi Aktif", value: "15", icon: TrendingUp, color: "text-blue-600" },
      { label: "Total Investasi", value: "Rp 2.1M", icon: DollarSign, color: "text-green-600" },
      { label: "ROI Rata-rata", value: "18.5%", icon: BarChart3, color: "text-purple-600" },
      { label: "Riset Didanai", value: "23", icon: BookOpen, color: "text-orange-600" },
    ],
    public: [
      { label: "Riset Diikuti", value: "8", icon: Eye, color: "text-blue-600" },
      { label: "Diskusi Aktif", value: "24", icon: MessageSquare, color: "text-green-600" },
      { label: "Kontribusi", value: "156", icon: Star, color: "text-purple-600" },
      { label: "Poin Reputasi", value: "2,340", icon: TrendingUp, color: "text-orange-600" },
    ],
  }

  const myResearch = [
    {
      id: "1",
      title: "AI untuk Deteksi Dini Penyakit Tanaman",
      status: "active",
      progress: 65,
      funding: 150000000,
      targetFunding: 200000000,
      backers: 12,
      lastUpdate: "2 hari lalu",
      nextMilestone: "Prototype Testing",
      dueDate: "15 Mar 2024",
    },
    {
      id: "2",
      title: "Sistem Monitoring Kualitas Air IoT",
      status: "review",
      progress: 25,
      funding: 45000000,
      targetFunding: 80000000,
      backers: 5,
      lastUpdate: "1 minggu lalu",
      nextMilestone: "Literature Review",
      dueDate: "28 Mar 2024",
    },
  ]

  const notifications = [
    {
      id: "1",
      type: "funding",
      title: "Pendanaan Baru Diterima",
      message: "PT. Tech Innovate mendanai riset AI Anda sebesar Rp 50M",
      time: "2 jam lalu",
      read: false,
    },
    {
      id: "2",
      type: "milestone",
      title: "Milestone Tercapai",
      message: "Prototype testing untuk riset IoT telah selesai",
      time: "1 hari lalu",
      read: false,
    },
    {
      id: "3",
      type: "collaboration",
      title: "Permintaan Kolaborasi",
      message: "Dr. Sarah ingin berkolaborasi dalam riset AI Anda",
      time: "3 hari lalu",
      read: true,
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "Research Presentation Day",
      date: "2024-03-20",
      time: "14:00",
      type: "presentation",
      location: "Virtual",
    },
    {
      id: "2",
      title: "Investor Meetup",
      date: "2024-03-25",
      time: "10:00",
      type: "networking",
      location: "Jakarta",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "review":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "review":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add IncubatorNav */}
      <IncubatorNav />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Incubator</h1>
              <p className="text-gray-600 mt-1">Selamat datang kembali, Dr. Sari Indrawati</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Role Switcher */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(["researcher", "funder", "public"] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setUserRole(role)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      userRole === role ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {role === "researcher" ? "Peneliti" : role === "funder" ? "Pendana" : "Publik"}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats[userRole].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {userRole === "researcher" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Riset Saya</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Riset Baru
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {myResearch.map((research) => (
                      <div key={research.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{research.title}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className={getStatusColor(research.status)}>
                                {getStatusIcon(research.status)}
                                <span className="ml-1 capitalize">{research.status}</span>
                              </Badge>
                              <span className="text-sm text-gray-500">Update terakhir: {research.lastUpdate}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/incubator/research/${research.id}`}>Lihat Detail</Link>
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="font-medium">Progress Riset</span>
                              <span className="font-medium">{research.progress}%</span>
                            </div>
                            <Progress value={research.progress} className="h-2" />
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="font-medium">Pendanaan</span>
                              <span className="font-medium">
                                Rp {(research.funding / 1000000).toFixed(1)}M / Rp{" "}
                                {(research.targetFunding / 1000000).toFixed(1)}M
                              </span>
                            </div>
                            <Progress value={(research.funding / research.targetFunding) * 100} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t">
                            <span>{research.backers} pendana</span>
                            <span>Milestone berikutnya: {research.nextMilestone}</span>
                            <span>Due: {research.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "funding",
                      message: "Riset AI Anda mendapat pendanaan tambahan Rp 25M",
                      time: "2 jam lalu",
                      avatar:
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                    },
                    {
                      type: "milestone",
                      message: "Milestone 'Data Collection' telah selesai",
                      time: "1 hari lalu",
                      avatar:
                        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
                    },
                    {
                      type: "collaboration",
                      message: "Dr. Ahmad bergabung sebagai co-researcher",
                      time: "3 hari lalu",
                      avatar:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifikasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        !notification.read ? "bg-blue-50 border-blue-200" : "bg-gray-50"
                      }`}
                    >
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Lihat Semua
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Acara Mendatang
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{event.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link href="/incubator/events">Lihat Semua Acara</Link>
                </Button>
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
                    Submit Riset Baru
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <Link href="/incubator/community">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Mulai Diskusi
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Cari Kolaborator
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Dokumen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
