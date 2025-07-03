"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Calendar, MessageSquare, Star, BookOpen, Award, Video, FileText } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function MentorDashboard() {
  const { user } = useAuth()

  if (!user || user.role !== "mentor") {
    return <div>Access denied</div>
  }

  const menteeProjects = [
    {
      id: 1,
      title: "EcoWaste - Aplikasi Pengelolaan Sampah",
      student: "Ahmad Rizki Pratama",
      progress: 75,
      nextSession: "25 Jan 2024",
      status: "on-track",
    },
    {
      id: 2,
      title: "FoodTech Delivery",
      student: "Siti Nurhaliza",
      progress: 45,
      nextSession: "26 Jan 2024",
      status: "needs-attention",
    },
    {
      id: 3,
      title: "EdTech Platform",
      student: "Budi Setiawan",
      progress: 90,
      nextSession: "28 Jan 2024",
      status: "excellent",
    },
  ]

  const upcomingSessions = [
    {
      time: "10:00",
      date: "25 Jan",
      student: "Ahmad Rizki",
      project: "EcoWaste",
      type: "Strategy Review",
    },
    {
      time: "14:00",
      date: "25 Jan",
      student: "Siti Nurhaliza",
      project: "FoodTech",
      type: "Problem Solving",
    },
    {
      time: "16:00",
      date: "26 Jan",
      student: "Budi Setiawan",
      project: "EdTech",
      type: "Final Review",
    },
  ]

  const recentActivities = [
    { type: "session", message: "Sesi mentoring dengan Ahmad Rizki selesai", time: "2 jam lalu" },
    { type: "review", message: "Review proposal FoodTech Delivery", time: "5 jam lalu" },
    { type: "feedback", message: "Feedback diberikan untuk EdTech Platform", time: "1 hari lalu" },
    { type: "achievement", message: "Mentee berhasil mencapai target funding", time: "2 hari lalu" },
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
            <p className="text-gray-600">Mentor • {user.profile?.location}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">Mentor</Badge>
              {user.profile?.verified && <Badge variant="default">Terverifikasi</Badge>}
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mentee</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">3 aktif bulan ini</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sesi Mentoring</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">12 bulan ini</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyek Berhasil</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">75% success rate</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.9</div>
              <p className="text-xs text-muted-foreground">Dari 89 review</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mentee Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Proyek Mentee</CardTitle>
              <CardDescription>Pantau progress proyek yang Anda bimbing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {menteeProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-gray-600">oleh {project.student}</p>
                      <Badge
                        variant={
                          project.status === "excellent"
                            ? "default"
                            : project.status === "on-track"
                              ? "secondary"
                              : "destructive"
                        }
                        className="mt-1"
                      >
                        {project.status === "excellent"
                          ? "Excellent"
                          : project.status === "on-track"
                            ? "On Track"
                            : "Needs Attention"}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Progress</p>
                      <p className="font-semibold">{project.progress}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Sesi Berikutnya</p>
                      <p className="font-semibold">{project.nextSession}</p>
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
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Sesi Mendatang</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{session.time}</span>
                    <Badge variant="outline">{session.date}</Badge>
                  </div>
                  <p className="text-sm font-medium">{session.student}</p>
                  <p className="text-xs text-gray-600">
                    {session.project} • {session.type}
                  </p>
                  <Button size="sm" className="w-full mt-2">
                    <Video className="h-4 w-4 mr-2" />
                    Join Meeting
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Jadwalkan Sesi
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Buat Laporan
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Kirim Feedback
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/incubator">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Akses Resources
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Expertise Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Area Keahlian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.profile?.expertise?.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
