"use client"

import { useState } from "react"
import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageTransition } from "@/components/ui/page-transition"
import ProjectCard from "@/components/project-card"
import ProjectFilters from "@/components/project-filters"
import { featuredProjects } from "@/lib/dummy-data"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Jelajahi Proyek</h1>
                <p className="text-gray-600 text-lg sm:text-xl max-w-2xl">
                  Temukan dan dukung proyek riset dan penelitian pelajar yang inovatif dan inspiratif
                </p>
              </div>
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a href="/projects/create">Mulai Proyekmu</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <ProjectFilters />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search and Mobile Filter */}
              <div className="mb-6 sm:mb-8 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Cari proyek berdasarkan nama, kategori, atau sekolah..."
                    className="pl-12 py-3 text-base bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Mobile Filter Button */}
                <div className="xl:hidden">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-3"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
                  </Button>

                  {/* Mobile Filters */}
                  {showFilters && (
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                      <ProjectFilters />
                    </div>
                  )}
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Menampilkan{" "}
                  {
                    featuredProjects.filter(
                      (project) =>
                        searchQuery === "" ||
                        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.school.toLowerCase().includes(searchQuery.toLowerCase()),
                    ).length
                  }{" "}
                  dari {featuredProjects.length} proyek
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {featuredProjects
                  .filter(
                    (project) =>
                      searchQuery === "" ||
                      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      project.school.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
              </div>

              {/* Empty State */}
              {featuredProjects.filter(
                (project) =>
                  searchQuery === "" ||
                  project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  project.school.toLowerCase().includes(searchQuery.toLowerCase()),
              ).length === 0 && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada proyek ditemukan</h3>
                    <p className="text-gray-600 mb-6">
                      Coba ubah kata kunci pencarian atau filter untuk menemukan proyek yang sesuai
                    </p>
                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                      Reset Pencarian
                    </Button>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {featuredProjects.filter(
                (project) =>
                  searchQuery === "" ||
                  project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  project.school.toLowerCase().includes(searchQuery.toLowerCase()),
              ).length > 0 && (
                <div className="flex justify-center">
                  <nav className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled className="px-4 py-2">
                      Sebelumnya
                    </Button>
                    <Button variant="outline" size="sm" className="bg-blue-50 border-blue-200 text-blue-600 px-4 py-2">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="px-4 py-2">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="px-4 py-2">
                      3
                    </Button>
                    <Button variant="outline" size="sm" className="px-4 py-2">
                      Selanjutnya
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
