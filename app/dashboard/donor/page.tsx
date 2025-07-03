"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Users, Award, Heart, BarChart3, Eye, MessageSquare, Target } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DonorDashboard() {
  const { user } = useAuth()

  if (!user || user.role !== "donor") {
    return <div>Access denied</div>
  }

  const supportedProjects = [
    {
      id: 1,
      title: "EcoWaste - Aplikasi Pengelolaan Sampah",
      student: "Ahmad Rizki Pratama",
      myContribution: 2000000,
      totalFunded: 15000000,
      target: 20000000,
      progress: 75,
      status: "active",
      lastUpdate: "2 hari lalu",
    },
    {
      id: 2,
      title: "StudyBuddy - Platform Belajar Kolaboratif",
      student: "Siti Nurhaliza",
      myContribution: 1500000,
      totalFunded: 8000000,
      target: 12000000,
      progress: 67,
      status: "active",
      lastUpdate: "1 minggu lalu",
    },
    {
      id: 3,
      title: "FoodTech Delivery",
      student: "Budi Setiawan",
      myContribution: 3000000,
      totalFunded: 18000000,
      target: 18000000,
      progress: 100,
      status: "completed",
      lastUpdate: "1 bulan lalu",
    },
  ]

  const investmentSummary = {
    totalInvested: 6500000,
    activeProjects: 2,
    completedProjects: 1,
    averageROI: 15.5,
    successRate: 85,
  }

  const recentActivities = [
    { type: "update", message: "EcoWaste mencapai milestone prototype", time: "2 jam lalu" },
    { type: "funding", message: "Donasi Rp 2M untuk EcoWaste berhasil", time: "2 hari lalu" },
    { type: "success", message: "FoodTech Delivery berhasil mencapai target", time: "1 minggu lalu" },
    { type: "report", message: "Laporan bulanan StudyBuddy tersedia", time: "2 minggu lalu" },
  ]

  const recommendedProjects = [
    {
      title: "GreenEnergy Solutions",
      category: "Sustainability",
      target: 25000000,
      progress: 30,
      daysLeft: 45,
    },
    {
      title: "HealthTech Mobile App",
      category: "Healthcare",
      target: 15000000,
      progress: 20,
      daysLeft: 60,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Selamat datang, {user.name}!</h1>
            <p className="text-gray-600">Angel Investor • {user.profile?.location}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">Donatur</Badge>
              {user.profile?.verified && <Badge variant="default">Terverifikasi</Badge>}
              <Badge variant="outline">
                <Heart className="h-3 w-3 mr-1" />
                Impact Investor
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investasi</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {(investmentSummary.totalInvested / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">
                Dalam {investmentSummary.activeProjects + investmentSummary.completedProjects} proyek
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyek Aktif</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investmentSummary.activeProjects}</div>
              <p className="text-xs text-muted-foreground">{investmentSummary.completedProjects} selesai</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investmentSummary.successRate}%</div>
              <p className="text-xs text-muted-foreground">Tingkat keberhasilan</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Impact</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investmentSummary.averageROI}%</div>
              <p className="text-xs text-muted-foreground">Social impact score</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Supported Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Proyek yang Didukung</CardTitle>
                <Button variant="outline" asChild>
                  <Link href="/projects">
                    <Eye className="h-4 w-4 mr-2" />
                    Jelajahi Proyek
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportedProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-gray-600">oleh {project.student}</p>
                      <Badge variant={project.status === "completed" ? "default" : "secondary"} className="mt-1">
                        {project.status === "completed" ? "Selesai" : "Aktif"}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Lihat Detail
                    </Button>
                  </div>

                  {project.status === "active" && (
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress Pendanaan</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Kontribusi Saya</p>
                      <p className="font-semibold">Rp {(project.myContribution / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Terkumpul</p>
                      <p className="font-semibold">Rp {(project.totalFunded / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Update Terakhir</p>
                      <p className="font-semibold">{project.lastUpdate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link href="/projects">
                  <Heart className="h-4 w-4 mr-2" />
                  Dukung Proyek Baru
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Lihat Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Hubungi Pelajar
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/portfolio">
                  <Users className="h-4 w-4 mr-2" />
                  Jelajahi Portfolio
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recommended Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Proyek Rekomendasi</CardTitle>
              <CardDescription>Berdasarkan preferensi investasi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedProjects.map((project, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-1">{project.title}</h4>
                  <Badge variant="outline" className="mb-2">
                    {project.category}
                  </Badge>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Target: Rp {project.target / 1000000}M</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1" />
                    <p className="text-xs text-gray-600">{project.daysLeft} hari tersisa</p>
                  </div>
                  <Button size="sm" className="w-full mt-2">
                    Lihat Detail
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Investment Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Impact Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Pelajar Terbantu</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Lapangan Kerja</span>
                <span className="font-semibold">45+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Revenue Generated</span>
                <span className="font-semibold">Rp 2.1M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Social Impact Score</span>
                <span className="font-semibold">8.5/10</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
