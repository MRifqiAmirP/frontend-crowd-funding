"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Award, BookOpen, DollarSign, Users } from "lucide-react"
import { MotionButton } from "@/components/ui/motion-button"
import { PageTransition } from "@/components/ui/page-transition"
import ProjectCard from "@/components/project-card"
import TestimonialCard from "@/components/testimonial-card"
import NewsletterForm from "@/components/newsletter-form"
import HowItWorks from "@/components/how-it-works"
import VideoPlayer from "@/components/video-player"
import { featuredProjects, testimonials } from "@/lib/dummy-data"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

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
  }

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              >
                Wujudkan Ide Riset dan Penelitianmu Bersama <span className="text-yellow-300">ProyekSiswa.id</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Platform crowdfunding pendidikan pertama di Indonesia yang didedikasikan untuk mendukung proyek riset dan penelitian
                pelajar/mahasiswa.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <MotionButton size="lg" className="bg-white text-blue-700 hover:bg-gray-100 w-full sm:w-auto">
                  <Link href="/projects/create" className="flex items-center justify-center">
                    Mulai Proyekmu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </MotionButton>
                <MotionButton
                  size="lg"
                  variant="outline"
                  className="border-white text-blue-700 hover:bg-white/10 w-full sm:w-auto"
                >
                  <Link href="/projects">Dukung Proyek</Link>
                </MotionButton>
              </motion.div>
            </div>

            {/* Video/Image Content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <VideoPlayer
                  videoUrl="https://www.youtube.com/embed/rTpk36xQStY"
                  thumbnailUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                  title="Apa itu ProyekSiswa.id"
                />
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-300/20 rounded-full blur-xl"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 sm:mt-20"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
              {[
                { label: "Proyek Terdanai", value: "500+" },
                { label: "Dana Tersalurkan", value: "Rp2.5M+" },
                { label: "Pelajar Terlibat", value: "1,200+" },
                { label: "Sekolah & Kampus", value: "250+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-blue-100">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Bagaimana ProyekSiswa.id Bekerja?
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Ikuti langkah-langkah sederhana ini untuk memulai perjalanan riset dan penelitianmu atau mendukung proyek
              inovatif
            </p>
          </motion.div>
          <HowItWorks />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">Proyek Unggulan</h2>
              <p className="text-gray-600 text-lg">Temukan proyek-proyek inovatif dari pelajar Indonesia</p>
            </div>
            <Link
              href="/projects"
              className="text-blue-600 hover:text-blue-800 flex items-center group text-lg font-medium"
            >
              <span>Lihat Semua</span>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Mengapa Memilih ProyekSiswa.id?</h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Kami tidak hanya menyediakan platform pendanaan, tetapi juga ekosistem lengkap untuk mengembangkan potensi
              ide penelitian serta kewirausahaan pelajar 
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {[
              {
                icon: DollarSign,
                title: "Pendanaan Terpercaya",
                description: "Sistem pendanaan yang transparan dan aman untuk mewujudkan ide riset dan penelitianmu",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
              },
              {
                icon: Users,
                title: "Bimbingan Mentor",
                description: "Dapatkan bimbingan dari mentor berpengalaman di bidangmu",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
              },
              {
                icon: BookOpen,
                title: "Edukasi Bisnis",
                description: "Akses ke materi pembelajaran dan workshop kewirausahaan",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
              },
              {
                icon: Award,
                title: "Pengakuan & Jaringan",
                description: "Bangun portofolio dan jaringan dengan komunitas peneliti muda",
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg text-center overflow-hidden group"
              >
                <div className="relative h-32 sm:h-40 mb-4 sm:mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={benefit.image || "/placeholder.svg"}
                    alt={benefit.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
                >
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Cerita Sukses</h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Dengarkan pengalaman mereka yang telah berhasil mewujudkan ide bisnisnya melalui ProyekSiswa.id
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Success Stories Video Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Video Kisah Sukses</h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Saksikan perjalanan inspiratif para alumni ProyekSiswa.id yang telah berhasil membangun dari riset dan penelitian mereka
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Perjalanan GreenTech Solutions",
                thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
                videoUrl: "https://www.youtube.com/embed/Iqr3XIhSnUQ",
              },
              {
                title: "EduApp Indonesia Story",
                thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
                videoUrl: "https://www.youtube.com/embed/Iqr3XIhSnUQ",
              },
              {
                title: "FoodTech Nusantara Journey",
                thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
                videoUrl: "https://www.youtube.com/embed/Iqr3XIhSnUQ",
              },
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <VideoPlayer videoUrl={video.videoUrl} thumbnailUrl={video.thumbnail} title={video.title} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Siap Memulai Perjalanan Penelitianmu?
            </h2>
            <p className="text-xl sm:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Bergabunglah dengan ribuan pelajar dan mahasiswa yang telah mewujudkan ide penelitiannya melalui
              ProyekSiswa.id
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
            >
              <MotionButton size="lg" className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-4">
                <Link href="/register">Daftar Sekarang</Link>
              </MotionButton>
              <MotionButton
                size="lg"
                variant="outline"
                className="border-white text-blue-700 hover:bg-white/10 text-lg px-8 py-4"
              >
                <Link href="/about">Pelajari Lebih Lanjut</Link>
              </MotionButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Dapatkan Inspirasi Bisnis Terbaru
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed">
              Berlangganan newsletter kami untuk mendapatkan update proyek inspiratif
            </p>
            <NewsletterForm />
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
