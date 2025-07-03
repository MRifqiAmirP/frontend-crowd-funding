"use client"

import Image from "next/image"
import Link from "next/link"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/ui/page-transition"
import DonationForm from "@/components/donation-form"
import ProjectUpdates from "@/components/project-updates"
import ProjectComments from "@/components/project-comments"
import VideoPlayer from "@/components/video-player"
import ImageGallery from "@/components/image-gallery"
import { featuredProjects } from "@/lib/dummy-data"
import RealTimeFunding from "@/components/real-time-funding"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // Find project from dummy data
  const project = featuredProjects.find((p) => p.id === params.id) || featuredProjects[0]

  const percentFunded = Math.min(Math.round((project.currentFunding / project.targetFunding) * 100), 100)

  // Format currency to IDR
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const rewards = [
    {
      id: "1",
      title: "Supporter",
      amount: 50000,
      description: "Ucapan terima kasih di media sosial dan newsletter kami",
      backers: 15,
    },
    {
      id: "2",
      title: "Early Bird",
      amount: 100000,
      description: "1 produk edisi khusus + ucapan terima kasih di media sosial",
      backers: 20,
    },
    {
      id: "3",
      title: "Premium Bundle",
      amount: 250000,
      description: "3 produk edisi khusus + nama Anda di website kami sebagai pendukung",
      backers: 7,
    },
  ]

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <Link href="/projects" className="text-blue-600 hover:underline">
            &larr; Kembali ke Daftar Proyek
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

            <div className="mb-6">
              <VideoPlayer
                videoUrl={project.video || "https://www.youtube.com/embed/Iqr3XIhSnUQ"}
                thumbnailUrl={project.image}
                title={project.title}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{project.category}</span>
              <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">{project.school}</span>
            </div>

            <Tabs defaultValue="deskripsi">
              <TabsList className="mb-4">
                <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
                <TabsTrigger value="galeri">Galeri</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="komentar">Komentar</TabsTrigger>
              </TabsList>

              <TabsContent value="deskripsi">
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">{project.description}</p>

                  <h3 className="text-xl font-semibold mb-4">Tentang Proyek Ini</h3>
                  <p className="mb-4">
                    Proyek ini merupakan inovasi yang dikembangkan oleh tim {project.creator.name} dengan tujuan
                    memberikan solusi nyata untuk permasalahan yang ada di masyarakat. Dengan pendekatan yang
                    berkelanjutan dan ramah lingkungan, kami berkomitmen untuk menciptakan dampak positif.
                  </p>

                  <h3 className="text-xl font-semibold mb-4">Rencana Penggunaan Dana</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Pengembangan produk dan riset: 40%</li>
                    <li>Pemasaran dan promosi: 25%</li>
                    <li>Operasional dan produksi: 20%</li>
                    <li>Tim dan sumber daya manusia: 15%</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4">Target dan Milestone</h3>
                  <p className="mb-4">
                    Dengan dukungan Anda, kami menargetkan untuk mencapai milestone penting dalam 6 bulan ke depan,
                    termasuk peluncuran produk beta, kerjasama dengan mitra strategis, dan ekspansi ke pasar yang lebih
                    luas.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="galeri">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Galeri Proyek</h3>
                  <ImageGallery images={project.gallery || []} title={project.title} />
                </div>
              </TabsContent>

              <TabsContent value="updates">
                <ProjectUpdates projectId={project.id} />
              </TabsContent>

              <TabsContent value="komentar">
                <ProjectComments projectId={project.id} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24">
              <RealTimeFunding projectId={project.id} showRecentDonations={true} compact={false} />

              <DonationForm projectId={project.id} rewards={rewards} />

              <div className="mt-4">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Bagikan Proyek
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Tentang Kreator</h3>
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src={project.creator.image || "/placeholder.svg"}
                    alt={project.creator.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{project.creator.name}</h4>
                  <p className="text-sm text-gray-600">{project.creator.projects} proyek</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">{project.creator.bio}</p>
              <Button variant="outline" className="w-full">
                Hubungi Kreator
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
