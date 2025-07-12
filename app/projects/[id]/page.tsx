"use client";

import { useState, useEffect } from "react"; // Import useState and useEffect
import Image from "next/image";
import Link from "next/link";
import { Share2, Loader2, AlertCircle } from "lucide-react"; // Added Loader2 and AlertCircle
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTransition } from "@/components/ui/page-transition";
import DonationFormEnhanced from "@/components/payment/donation-form-enhanced"; // Using DonationFormEnhanced
import ProjectUpdates from "@/components/project-updates";
import ProjectComments from "@/components/project-comments";
import VideoPlayer from "@/components/video-player";
import ImageGallery from "@/components/image-gallery";
import RealTimeFunding from "@/components/real-time-funding";
import {
  getProjectDetails,
  ProjectDetails,
  GalleryItem,
} from "@/lib/project-details-api"; // Import the API function, ProjectDetails type, and GalleryItem
import { Alert, AlertDescription } from "@/components/ui/alert"; // Import Alert and AlertDescription

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, setProject] = useState<ProjectDetails | null>(null); // State to store fetched project details
  const [isLoading, setIsLoading] = useState(true); // Loading state for project details
  const [error, setError] = useState<string | null>(null); // Error state for project details

  // Fetch project details on component mount or when params.id changes
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedProject = await getProjectDetails(params.id);
        setProject(fetchedProject);
      } catch (err: any) {
        setError(err.message || "Gagal memuat detail proyek.");
        console.error("Failed to fetch project details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]); // Dependency array includes params.id to refetch if ID changes

  // Handle loading state
  if (isLoading) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="mt-4 text-lg text-gray-600">Memuat detail proyek...</p>
        </div>
      </PageTransition>
    );
  }

  // Handle error state
  if (error) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8 max-w-md mx-auto text-center">
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-6 w-6 mx-auto text-red-600 mb-2" />
            <AlertDescription className="text-red-800 text-base font-medium">
              {error}
            </AlertDescription>
            <p className="text-sm text-gray-700 mt-2">
              Silakan coba muat ulang halaman atau kembali ke{" "}
              <Link href="/projects" className="text-blue-600 hover:underline">
                halaman proyek
              </Link>
            </p>
          </Alert>
        </div>
      </PageTransition>
    );
  }

  // Handle project not found (if API returns null or empty data)
  if (!project) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Proyek Tidak Ditemukan</h2>
          <p className="text-gray-600">
            Maaf, proyek yang Anda cari tidak ditemukan. Silakan kembali ke{" "}
            <Link href="/projects" className="text-blue-600 hover:underline">
              halaman proyek
            </Link>
          </p>
        </div>
      </PageTransition>
    );
  }

  const percentFunded = Math.min(
    Math.round((project.currentFunding / project.targetFunding) * 100),
    100
  );

  // Format currency to IDR
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
                videoUrl={
                  project.videoUrl ||
                  "https://www.youtube.com/embed/Iqr3XIhSnUQ" // Use project.videoUrl
                }
                thumbnailUrl={project.image} // Use project.image (mapped from thumbnailUrl)
                title={project.title}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {project.category}
              </span>
              <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                {project.school}
              </span>
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
                  <p className="text-lg text-gray-700 mb-6">
                    {project.description}
                  </p>

                  <h3 className="text-xl font-semibold mb-4">
                    Tentang Proyek Ini
                  </h3>
                  <p className="mb-4">
                    {/* Use fullDescription if available, otherwise aboutProject, or a fallback */}
                    {project.fullDescription ||
                      project.aboutProject ||
                      "Deskripsi lengkap proyek ini akan segera ditambahkan."}
                  </p>

                  {/* You'll need to adapt these sections based on what your API provides */}
                  <h3 className="text-xl font-semibold mb-4">
                    Rencana Penggunaan Dana
                  </h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Pengembangan produk dan riset: 40%</li>
                    <li>Pemasaran dan promosi: 25%</li>
                    <li>Operasional dan produksi: 20%</li>
                    <li>Tim dan sumber daya manusia: 15%</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4">
                    Target dan Milestone
                  </h3>
                  <p className="mb-4">
                    Dengan dukungan Anda, kami menargetkan untuk mencapai
                    milestone penting dalam 6 bulan ke depan, termasuk
                    peluncuran produk beta, kerjasama dengan mitra strategis,
                    dan ekspansi ke pasar yang lebih luas.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="galeri">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Galeri Proyek</h3>
                  {/* project.galleries is an array of objects with imageUrl, title, caption */}
                  <ImageGallery
                    images={
                      project.galleries.map((g: GalleryItem) => ({
                        src: g.imageUrl,
                        alt: g.title || g.caption || "Project Image",
                      })) || []
                    }
                    title={project.title}
                  />
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
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 top-24">
              <RealTimeFunding
                projectId={project.id}
                showRecentDonations={true}
                compact={false}
              />
              <DonationFormEnhanced
                projectId={project.id}
                projectTitle={project.title}
              />{" "}
              {/* Pass projectTitle */}
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Bagikan Proyek
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Tentang Kreator</h3>
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4">
                  {/* Assuming creator image is not directly available from current API */}
                  <Image
                    src="/placeholder.svg" // Placeholder for creator image
                    alt="Creator"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{project.provider}</h4>{" "}
                  {/* Using provider as creator name */}
                  <p className="text-sm text-gray-600">
                    {/* project.creator.projects || "N/A" */}{" "}
                    {/* Projects count not available */}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                {/* project.creator.bio || "Bio kreator akan segera ditambahkan." */}{" "}
                {/* Creator bio not available */}
                Proyek ini dibuat oleh tim dari {project.institutionName}.
              </p>
              <Button variant="outline" className="w-full">
                Hubungi Kreator
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
