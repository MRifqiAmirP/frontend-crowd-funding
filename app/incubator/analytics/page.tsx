"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Users, DollarSign, Eye, MessageSquare, Star, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IncubatorNav from "@/components/incubator-nav"

export default function AnalyticsPage() {
  const overviewStats = [
    {
      label: "Total Riset",
      value: "89",
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      label: "Pendanaan Terkumpul",
      value: "Rp 2.8M",
      change: "+25%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "Anggota Komunitas",
      value: "2,450",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "Tingkat Keberhasilan",
      value: "78%",
      change: "-2%",
      trend: "down",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const topResearch = [
    {
      title: "AI untuk Deteksi Dini Penyakit Tanaman",
      researcher: "Dr. Sari Indrawati",
      funding: 150000000,
      views: 1250,
      engagement: 89,
      status: "Active",
    },
    {
      title: "Nanomaterial untuk Solar Cell",
      researcher: "Dr. Budi Santoso",
      funding: 200000000,
      views: 1580,
      engagement: 95,
      status: "Development",
    },
    {
      title: "Biofilter dari Limbah Organik",
      researcher: "Prof. Ahmad Fauzi",
      funding: 85000000,
      views: 980,
      engagement: 76,
      status: "Research",
    },
  ]

  const monthlyData = [
    { month: "Jan", research: 12, funding: 450, members: 180 },
    { month: "Feb", research: 15, funding: 620, members: 220 },
    { month: "Mar", research: 18, funding: 780, members: 280 },
    { month: "Apr", research: 22, funding: 950, members: 340 },
    { month: "May", research: 25, funding: 1200, members: 420 },
    { month: "Jun", research: 28, funding: 1450, members: 480 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <IncubatorNav />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
              <p className="text-gray-600 mt-1">Analisis performa dan tren platform incubator</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Last updated: 2 hours ago</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
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
                      <div className="flex items-center mt-2">
                        {stat.trend === "up" ? (
                          <ArrowUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm font-medium ml-1 ${
                            stat.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">vs last month</span>
                      </div>
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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="research">Riset</TabsTrigger>
            <TabsTrigger value="funding">Pendanaan</TabsTrigger>
            <TabsTrigger value="community">Komunitas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Tren Bulanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.slice(-3).map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between">
                        <span className="font-medium">{data.month}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <span>{data.research} riset</span>
                          <span>Rp {data.funding}M</span>
                          <span>{data.members} anggota</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Research */}
              <Card>
                <CardHeader>
                  <CardTitle>Riset Teratas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topResearch.map((research, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <h4 className="font-medium text-sm mb-1">{research.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">by {research.researcher}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span>Rp {(research.funding / 1000000).toFixed(1)}M</span>
                          <div className="flex items-center gap-2">
                            <Eye className="h-3 w-3" />
                            <span>{research.views}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {research.status}
                          </Badge>
                        </div>
                        <Progress value={research.engagement} className="h-1 mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="research" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Kategori Riset</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "AI & Machine Learning", count: 23, percentage: 26 },
                      { name: "Biotechnology", count: 18, percentage: 20 },
                      { name: "Renewable Energy", count: 15, percentage: 17 },
                      { name: "Healthcare", count: 21, percentage: 24 },
                      { name: "Others", count: 12, percentage: 13 },
                    ].map((category, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{category.name}</span>
                          <span>{category.count}</span>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Riset</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { status: "Active", count: 34, color: "bg-green-500" },
                      { status: "Development", count: 28, color: "bg-blue-500" },
                      { status: "Research", count: 18, color: "bg-yellow-500" },
                      { status: "Completed", count: 9, color: "bg-gray-500" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm">{item.status}</span>
                        </div>
                        <span className="font-medium">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: "Avg. Views", value: "1,250", icon: Eye },
                      { metric: "Avg. Comments", value: "24", icon: MessageSquare },
                      { metric: "Avg. Rating", value: "4.7", icon: Star },
                      { metric: "Success Rate", value: "78%", icon: TrendingUp },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{item.metric}</span>
                        </div>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="funding" className="mt-8">
            <div className="text-center py-12">
              <DollarSign className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Analisis Pendanaan</h3>
              <p className="text-gray-600">Detailed funding analytics coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-8">
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Analisis Komunitas</h3>
              <p className="text-gray-600">Community engagement analytics coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
