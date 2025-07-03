"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Award,
  Users,
  TrendingUp,
  Star,
  Download,
  Share2,
  Heart,
  Eye,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/ui/page-transition";
import { MotionButton } from "@/components/ui/motion-button";
import VideoPlayer from "@/components/video-player";
import { getPortfolioByUsername } from "@/lib/portfolio-data";

export default function PortfolioPage({
  params,
}: {
  params: { username: string };
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get portfolio data
  const portfolio = getPortfolioByUsername(params.username);

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-4">
            Portfolio dengan username "{params.username}" tidak ditemukan.
          </p>
          <Button asChild>
            <Link href="/portfolio">Kembali ke Portfolio</Link>
          </Button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const filteredProjects = portfolio.projects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory
  );

  const filteredMedia = portfolio.mediaGallery.filter(
    (media) => activeFilter === "all" || media.type === activeFilter
  );

  const handleDownloadCV = () => {
    // Simulate CV download
    const link = document.createElement("a");
    link.href = `/cv/${portfolio.username}-cv.pdf`;
    link.download = `${portfolio.name}-CV.pdf`;
    link.click();
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <Image
            src={
              portfolio.coverImage || "/placeholder.svg?height=600&width=1200"
            }
            alt="Cover"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="relative container mx-auto px-4 md:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image
                  src={
                    portfolio.profileImage ||
                    "/placeholder.svg?height=400&width=400"
                  }
                  alt={portfolio.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-2"
              >
                {portfolio.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-blue-100 mb-4"
              >
                {portfolio.title}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-white/90 mb-6 max-w-2xl"
              >
                {portfolio.bio}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {portfolio.skills.slice(0, 5).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <MotionButton
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-gray-100"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Hubungi Saya
                </MotionButton>
                <MotionButton
                  size="lg"
                  variant="outline"
                  className="border-white text-blue-700 hover:bg-gray-100"
                  onClick={handleDownloadCV}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </MotionButton>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            {[
              {
                label: "Proyek Selesai",
                value: portfolio.stats.completedProjects,
                icon: Award,
              },
              {
                label: "Total Pendanaan",
                value: `Rp${portfolio.stats.totalFunding}M`,
                icon: TrendingUp,
              },
              {
                label: "Followers",
                value: portfolio.stats.followers,
                icon: Users,
              },
              {
                label: "Rating",
                value: `${portfolio.stats.rating}/5`,
                icon: Star,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="projects">Proyek</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="achievements">Prestasi</TabsTrigger>
              <TabsTrigger value="testimonials">Testimoni</TabsTrigger>
              <TabsTrigger value="about">Tentang</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {[
                    "all",
                    "teknologi",
                    "lingkungan",
                    "edukasi",
                    "sosial",
                    "kesehatan",
                    "penelitian",
                    "desain",
                    "seni",
                    "kampanye",
                  ].map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category === "all" ? "Semua" : category}
                    </Button>
                  ))}
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={
                            project.image ||
                            "/placeholder.svg?height=300&width=400"
                          }
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          {project.status}
                        </div>
                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {project.category}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {project.year}
                          </span>
                          <span className="flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {project.funding}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {project.likes}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {project.views}
                            </span>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={project.link}>Lihat Detail</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {["all", "image", "video", "document"].map((type) => (
                    <Button
                      key={type}
                      variant={activeFilter === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(type)}
                      className="capitalize"
                    >
                      {type === "all"
                        ? "Semua"
                        : type === "image"
                        ? "Foto"
                        : type === "video"
                        ? "Video"
                        : "Dokumen"}
                    </Button>
                  ))}
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredMedia.map((media, index) => (
                  <motion.div key={media.id} variants={itemVariants}>
                    {media.type === "video" ? (
                      <VideoPlayer
                        videoUrl={media.url}
                        thumbnailUrl={media.thumbnail}
                        title={media.title}
                      />
                    ) : media.type === "image" ? (
                      <div className="relative group cursor-pointer">
                        <div className="relative h-64 rounded-lg overflow-hidden">
                          <Image
                            src={
                              media.url ||
                              "/placeholder.svg?height=400&width=600"
                            }
                            alt={media.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-medium text-sm bg-black/50 px-3 py-1 rounded">
                            {media.title}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Download className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="font-semibold mb-2">{media.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {media.description}
                        </p>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-2" />
                          Download
                        </Button>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {portfolio.achievements.map((achievement, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="bg-yellow-100 p-3 rounded-full">
                          <Award className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">
                            {achievement.title}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {achievement.description}
                          </p>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>{achievement.organization}</span>
                            <span>{achievement.year}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {portfolio.testimonials.map((testimonial, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="relative w-12 h-12 mr-4">
                          <Image
                            src={
                              testimonial.avatar ||
                              "/placeholder.svg?height=150&width=150"
                            }
                            alt={testimonial.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">
                            {testimonial.role}
                          </p>
                        </div>
                        <div className="ml-auto flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 italic">
                        "{testimonial.content}"
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {testimonial.date}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Tentang Saya</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 mb-4">{portfolio.bio}</p>
                      <p className="text-gray-700 mb-4">
                        Dengan pengalaman yang luas dalam bidang{" "}
                        {portfolio.title.toLowerCase()}, saya berkomitmen untuk
                        terus berinovasi dan memberikan kontribusi positif bagi
                        masyarakat. Setiap proyek yang saya kerjakan selalu
                        mengutamakan kualitas, dampak sosial, dan keberlanjutan.
                      </p>
                      <p className="text-gray-700">
                        Saya percaya bahwa kolaborasi dan pembelajaran
                        berkelanjutan adalah kunci untuk menciptakan solusi yang
                        meaningful dan sustainable. Mari berkolaborasi untuk
                        menciptakan perubahan positif!
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Keahlian & Teknologi
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {portfolio.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 px-3 py-2 rounded-lg text-center"
                        >
                          <span className="text-sm font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Pengalaman</h3>
                    <div className="space-y-4">
                      {portfolio.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-blue-200 pl-4"
                        >
                          <h4 className="font-semibold">{exp.position}</h4>
                          <p className="text-blue-600">{exp.company}</p>
                          <p className="text-sm text-gray-500">{exp.period}</p>
                          <p className="text-gray-700 mt-2">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Informasi Kontak
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-sm">{portfolio.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-sm">{portfolio.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3 text-gray-500" />
                        <span className="text-sm">{portfolio.phone}</span>
                      </div>
                      {portfolio.website && (
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-3 text-gray-500" />
                          <span className="text-sm">{portfolio.website}</span>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Media Sosial</h3>
                    <div className="space-y-3">
                      {portfolio.socialMedia.linkedin && (
                        <a
                          href={portfolio.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Linkedin className="h-5 w-5 mr-3 text-gray-600" />
                          <span className="text-sm">LinkedIn</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                      {portfolio.socialMedia.github && (
                        <a
                          href={portfolio.socialMedia.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Github className="h-5 w-5 mr-3 text-gray-600" />
                          <span className="text-sm">GitHub</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                      {portfolio.socialMedia.instagram && (
                        <a
                          href={portfolio.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Instagram className="h-5 w-5 mr-3 text-gray-600" />
                          <span className="text-sm">Instagram</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                      {portfolio.socialMedia.twitter && (
                        <a
                          href={portfolio.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Twitter className="h-5 w-5 mr-3 text-gray-600" />
                          <span className="text-sm">Twitter</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                      {portfolio.socialMedia.youtube && (
                        <a
                          href={portfolio.socialMedia.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Youtube className="h-5 w-5 mr-3 text-gray-600" />
                          <span className="text-sm">YouTube</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                      {portfolio.socialMedia.behance && (
                        <a
                          href={portfolio.socialMedia.behance}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Globe className="h-5 w-5 mr-3 text-gray-600" />
                          <span className="text-sm">Behance</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Pendidikan</h3>
                    <div className="space-y-4">
                      {portfolio.education.map((edu, index) => (
                        <div key={index}>
                          <h4 className="font-semibold">{edu.degree}</h4>
                          <p className="text-blue-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                          {edu.gpa && (
                            <p className="text-sm text-gray-600">
                              GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 md:px-6 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Tertarik Berkolaborasi?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Mari diskusikan bagaimana kita bisa bekerja sama untuk menciptakan
            solusi inovatif
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MotionButton
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100"
            >
              <Mail className="h-4 w-4 mr-2" />
              Hubungi Saya
            </MotionButton>
            <MotionButton
              size="lg"
              variant="outline"
              className="border-white text-white bg-white/10"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Bagikan Portfolio
            </MotionButton>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
