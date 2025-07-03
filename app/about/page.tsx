"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/ui/page-transition"
import { MotionButton } from "@/components/ui/motion-button"
import { MotionCard } from "@/components/ui/motion-card"
import { CheckCircle2, Heart, Mail, MapPin, Phone } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Muhammad Lutfi Kurniawan",
      role: "Co-Founder & CEO",
      image: "/images/team/lutfi.png",
      
    },
    {
      name: "Bima Saputra",
      role: "Co-Founder & COO",
      image: "/images/team/bima.jpg",
      
    },
    {
      name: "Mutiara Syafitri",
      role: "Co-Founder & CFO",
      image: "/images/team/mutiara.jpeg",
      
    },
  ]

  const partners = [
    {
      name: "Kementerian Pendidikan dan Kebudayaan",
      logo: "/placeholder.svg?height=100&width=200",
    },
    {
      name: "Universitas Indonesia",
      logo: "/placeholder.svg?height=100&width=200",
    },
    {
      name: "Institut Teknologi Bandung",
      logo: "/placeholder.svg?height=100&width=200",
    },
    {
      name: "Startup Indonesia",
      logo: "/placeholder.svg?height=100&width=200",
    },
    {
      name: "Bank Mandiri",
      logo: "/placeholder.svg?height=100&width=200",
    },
    {
      name: "Telkom Indonesia",
      logo: "/placeholder.svg?height=100&width=200",
    },
  ]

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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Tentang ProyekSiswa.id
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Platform crowdfunding pertama di Indonesia yang didedikasikan untuk mendukung proyek Riset dan Penelitian pelajar
            dan mahasiswa
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6">Cerita Kami</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <b>ProyekSiswa.id</b> berawal dari keprihatinan kami terhadap banyaknya ide riset inovatif dan ide penelitian dari pelajar dan
                  mahasiswa yang tidak bisa terealisasi karena keterbatasan dana dan dukungan.
                </p>
                <p>
                  Didirikan pada tahun 2025 oleh sekelompok mahasiswa perguruan tinggi yang memiliki passion di bidang
                  Riset, Penelitian dan Pendidikan. <b>ProyekSiswa.id hadir sebagai jembatan antara ide brilian anak muda
                  Indonesia dengan sumber daya yang mereka butuhkan</b>.
                </p>
                <p>
                  Kami percaya bahwa generasi muda Indonesia memiliki potensi luar biasa untuk menciptakan solusi
                  inovatif bagi berbagai permasalahan di sekitar mereka. Melalui platform ini, kami ingin memastikan
                  bahwa tidak ada ide brilian yang terbuang sia-sia hanya karena keterbatasan akses terhadap pendanaan
                  dan bimbingan.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <Image
                src="https://i.pinimg.com/736x/b3/a5/21/b3a52118be629fc7ec83250a5bb83155.jpg"
                alt="Cerita ProyekSiswa.id"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Visi & Misi Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami berkomitmen untuk mendukung riset dan penelitian pelajar di Indonesia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MotionCard className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Visi</h3>
                <p className="text-gray-700">
                Menjadi platform utama penggerak inovasi pendidikan di Indonesia melalui pendanaan terbuka dan kolaboratif bagi pelajar dan mahasiswa.
                </p>
                {/* <ul className="mt-6 space-y-2 text-left">
                  {[
                    "Membantu pelajar dan mahasiswa mewujudkan ide bisnis dan penelitian mereka",
                    "Membangun riset dan kewirausahaan yang inklusif dan berkelanjutan",
                    "Menghubungkan pelajar dengan mentor dan jaringan profesional",
                    "Mengedukasi generasi muda tentang kewirausahaan dan inovasi",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul> */}
              </div>
            </MotionCard>

            <MotionCard className="p-8" delay={0.2}>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Misi</h3>
                <p className="text-gray-700">
                Menyediakan platform yang aman, transparan, dan inklusif untuk memfasilitasi pendanaan dan
                  pengembangan proyek Riset dan Penelitian pelajar dan mahasiswa di seluruh Indonesia.
                </p>
                <ul className="mt-6 space-y-2 text-left">
                  {[
                    "Membantu pelajar dan mahasiswa mewujudkan ide bisnis dan penelitian mereka",
                    "Membangun riset dan penelitian yang inklusif dan berkelanjutan",
                    "Menghubungkan pelajar dengan mentor dan jaringan profesional",
                    "Mengedukasi generasi muda tentang Penelitian dan inovasi",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </MotionCard>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Tim Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kenali orang-orang di balik ProyekSiswa.id yang berdedikasi untuk mendukung Peneliti muda Indonesia
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center gap-8" // Ubah dari grid ke flex dan tambahkan justify-center
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg shadow-md overflow-hidden w-80" // Tambahkan lebar tetap agar kartu seragam
              >
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
            {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Mitra Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami berkolaborasi dengan berbagai institusi dan organisasi untuk mendukung Riseter dan Peneliti muda
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-32"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={150}
                  height={75}
                  className="max-h-16 w-auto"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Hubungi Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MotionCard className="p-6 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600">proyeksiswaa@gmail.com</p>
                {/* <p className="text-gray-600">support@proyeksiswa.id</p> */}
              </div>
            </MotionCard>

            <MotionCard className="p-6 text-center" delay={0.1}>
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Telepon</h3>
                <p className="text-gray-600">+62 898 3064 613</p>
                {/* <p className="text-gray-600">+62 813 6924 2331</p> */}
              </div>
            </MotionCard>

            <MotionCard className="p-6 text-center" delay={0.2}>
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Alamat</h3>
                <p className="text-gray-600">Jl. Sudirman No. 123</p>
                <p className="text-gray-600">Kota Palembang</p>
              </div>
            </MotionCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 md:px-6 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Bergabunglah dengan Komunitas Kami</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Jadilah bagian dari gerakan mendukung Peneliti muda Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MotionButton size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link href="/register">Daftar Sekarang</Link>
            </MotionButton>
            <MotionButton size="lg" variant="outline" className="border-white text-blue-700 hover:bg-white/10">
              <Link href="/projects">Jelajahi Proyek</Link>
            </MotionButton>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
