"use client"

import { useState } from "react"
import { Edit, Upload, Plus, Trash2, Eye, Share2, Download, ImageIcon, Video, FileText, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/ui/page-transition"
import { MotionButton } from "@/components/ui/motion-button"
import { portfolioData } from "@/lib/portfolio-data"

export default function DashboardPortfolioPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Portfolio Saya</h1>
            <p className="text-gray-600">Kelola dan update portfolio Anda</p>
          </div>
          <div className="flex gap-2">
            <MotionButton variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </MotionButton>
            <MotionButton variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Bagikan
            </MotionButton>
            <MotionButton>
              <Edit className="h-4 w-4 mr-2" />
              Edit Portfolio
            </MotionButton>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Proyek</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold">12,847</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">+12% dari bulan lalu</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Followers</p>
                      <p className="text-2xl font-bold">{portfolioData.stats.followers}</p>
                    </div>
                    <Share2 className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">+8% dari bulan lalu</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Proyek Aktif</p>
                      <p className="text-2xl font-bold">{portfolioData.stats.completedProjects}</p>
                    </div>
                    <Plus className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-blue-600 mt-2">2 proyek baru bulan ini</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Rating</p>
                      <p className="text-2xl font-bold">{portfolioData.stats.rating}/5</p>
                    </div>
                    <Settings className="h-8 w-8 text-yellow-600" />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Dari 47 review</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Proyek Terbaru</CardTitle>
                  <CardDescription>Proyek yang baru saja Anda tambahkan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-gray-600">{project.category}</p>
                        </div>
                        <Badge variant="secondary">{project.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Media Terbaru</CardTitle>
                  <CardDescription>File media yang baru saja diupload</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.mediaGallery.slice(0, 3).map((media) => (
                      <div key={media.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          {media.type === "video" ? (
                            <Video className="h-6 w-6 text-green-600" />
                          ) : media.type === "image" ? (
                            <ImageIcon className="h-6 w-6 text-green-600" />
                          ) : (
                            <FileText className="h-6 w-6 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{media.title}</h4>
                          <p className="text-sm text-gray-600 capitalize">{media.type}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Kelola Proyek</h2>
              <MotionButton>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Proyek
              </MotionButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="secondary">{project.status}</Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{project.year}</span>
                      <span>{project.likes} likes</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="media">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Kelola Media</h2>
              <MotionButton>
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </MotionButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioData.mediaGallery.map((media) => (
                <Card key={media.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="capitalize">
                        {media.type}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <h4 className="font-medium mb-2 line-clamp-2">{media.title}</h4>
                    <p className="text-xs text-gray-500">{media.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Analytics</CardTitle>
                  <CardDescription>Statistik performa portfolio Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">12,847</p>
                      <p className="text-sm text-gray-600">Total Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">2,847</p>
                      <p className="text-sm text-gray-600">Profile Visits</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">156</p>
                      <p className="text-sm text-gray-600">Contact Inquiries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.projects.slice(0, 5).map((project, index) => (
                      <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-gray-600">{project.views} views</p>
                        </div>
                        <Badge variant="outline">#{index + 1}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Portfolio</CardTitle>
                  <CardDescription>Kelola visibilitas dan preferensi portfolio Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Portfolio Publik</h4>
                      <p className="text-sm text-gray-600">Portfolio dapat dilihat oleh semua orang</p>
                    </div>
                    <Button variant="outline">Aktif</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notifikasi Email</h4>
                      <p className="text-sm text-gray-600">Terima notifikasi untuk aktivitas portfolio</p>
                    </div>
                    <Button variant="outline">Aktif</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SEO Optimization</h4>
                      <p className="text-sm text-gray-600">Optimasi portfolio untuk mesin pencari</p>
                    </div>
                    <Button variant="outline">Aktif</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Export Portfolio</CardTitle>
                  <CardDescription>Download portfolio dalam berbagai format</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export JSON
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
