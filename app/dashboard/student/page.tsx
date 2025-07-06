"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  DollarSign,
  Users,
  Plus,
  Award,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProjects, Project } from "@/lib/project";
import { toast } from "@/components/ui/use-toast";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyProjects = async () => {
      if (!user) return;

      setLoadingProjects(true);
      setErrorProjects(null);
      try {
        const response = await getProjects(); // Menerima objek respons dari API
        console.log({ projectsData: response, user }); // Log objek respons keseluruhan

        // --- PERBAIKAN UTAMA DI SINI ---
        // Pastikan response dan response.data ada, dan response.data.data adalah array
        if (response && response.success && Array.isArray(response.data)) {
          const projectsData = response.data; // Array proyek yang sebenarnya

          // Filter proyek berdasarkan user.id jika API menyediakan 'userId' di setiap proyek
          const userProjects = projectsData.filter(
            (project) => project.userId === user.id // Asumsi project.userId cocok dengan user.id dari auth context
            // Atau, jika Anda ingin memfilter berdasarkan provider/sekolah:
            // (project.provider === user.profile?.school)
            // (project.institutionName === user.profile?.school) // Sesuaikan dengan properti yang benar
          );
          setMyProjects(userProjects);
        } else {
          // Handle case where data is not an array or API response is not successful
          const errorMessage =
            response?.message || "Format data proyek tidak sesuai.";
          setErrorProjects(errorMessage);
          toast({
            title: "Gagal memuat proyek",
            description: errorMessage,
            type: "error", // Gunakan variant "destructive" untuk error
          });
        }
      } catch (error: any) {
        console.error("Failed to fetch projects:", error);
        setErrorProjects(error.message || "Gagal memuat proyek.");
        toast({
          title: "Gagal memuat proyek",
          description:
            error.message || "Terjadi kesalahan saat mengambil data proyek.",
          type: "error",
        });
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchMyProjects();
  }, [user]);

  if (!user || user.role !== "student") {
    return <div>Access denied</div>;
  }

  const recentActivities = [
    {
      type: "funding",
      message: "Anda menerima donasi Rp 500.000 untuk EcoWaste",
      time: "2 jam lalu",
    },
    {
      type: "comment",
      message: "Komentar baru pada proyek EcoWaste",
      time: "5 jam lalu",
    },
    {
      type: "milestone",
      message: "Milestone 'Prototype Development' tercapai",
      time: "1 hari lalu",
    },
    {
      type: "mentor",
      message: "Sesi mentoring dengan Dr. Sarah Wijaya dijadwalkan",
      time: "2 hari lalu",
    },
  ];

  const upcomingEvents = [
    {
      title: "Workshop: Pitching Your Startup",
      date: "25 Jan 2024",
      time: "14:00",
    },
    { title: "Mentoring Session", date: "27 Jan 2024", time: "10:00" },
    { title: "Demo Day Preparation", date: "30 Jan 2024", time: "16:00" },
  ];

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to calculate days left
  const calculateDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={
                user.avatar ||
                `https://api.dicebear.com/9.x/dylan/svg?seed=${user.name}`
              }
              alt={user.name}
            />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Selamat datang, {user.name}!</h1>
            <p className="text-gray-600">
              {user.profile?.school} • {user.profile?.major}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">Pelajar</Badge>
              {user.profile?.verified && (
                <Badge variant="default">Terverifikasi</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Proyek Aktif
              </CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {myProjects.filter((p) => p.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {myProjects.filter((p) => p.status === "active").length > 0
                  ? "Beberapa sedang berjalan"
                  : "Tidak ada proyek aktif"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pendanaan
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(
                  myProjects.reduce((sum, p) => sum + (p.funded || 0), 0)
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Total dari proyek Anda
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pendukung
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {myProjects.reduce((sum, p) => sum + (p.backers || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Dari {myProjects.length} proyek
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sesi Mentoring
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Bulan ini</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Proyek Saya</CardTitle>
                <Button asChild>
                  <Link href="/projects/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Proyek Baru
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingProjects ? (
                <div className="text-center text-gray-500">
                  Memuat proyek...
                </div>
              ) : errorProjects ? (
                <div className="text-center text-red-500">
                  Error: {errorProjects}
                </div>
              ) : myProjects.length === 0 ? (
                <div className="text-center text-gray-500">
                  Anda belum memiliki proyek. Buat proyek baru!
                </div>
              ) : (
                myProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{project.projectName}</h3>
                        <Badge
                          variant={
                            project.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {project.status === "active"
                            ? "Aktif"
                            : project.status === "draft"
                            ? "Draft"
                            : project.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Kelola
                      </Button>
                    </div>

                    {project.status === "active" && (
                      <>
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-sm">
                            <span>Progress Pendanaan</span>
                            <span>
                              {project.target > 0
                                ? Math.min(
                                    100,
                                    Math.round(
                                      ((project.funded || 0) / project.target) *
                                        100
                                    )
                                  )
                                : 0}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              project.target > 0
                                ? Math.min(
                                    100,
                                    ((project.funded || 0) / project.target) *
                                      100
                                  )
                                : 0
                            }
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Terkumpul</p>
                            <p className="font-semibold">
                              {formatCurrency(project.funded || 0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Pendukung</p>
                            <p className="font-semibold">
                              {project.backers || 0}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Sisa Hari</p>
                            <p className="font-semibold">
                              {calculateDaysLeft(project.deadline)}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
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
                <Link href="/projects/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Proyek Baru
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/incubator">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Akses Incubator
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/portfolio">
                  <Award className="h-4 w-4 mr-2" />
                  Lihat Portfolio
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Acara Mendatang</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="border-l-2 border-blue-600 pl-3">
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-gray-600">
                    {event.date} • {event.time}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Pembelajaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Business Fundamentals</span>
                  <span>80%</span>
                </div>
                <Progress value={80} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pitching Skills</span>
                  <span>60%</span>
                </div>
                <Progress value={60} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Financial Planning</span>
                  <span>40%</span>
                </div>
                <Progress value={40} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
