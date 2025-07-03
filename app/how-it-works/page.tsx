"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PageTransition } from "@/components/ui/page-transition"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MotionButton } from "@/components/ui/motion-button"
import { CheckCircle2, LightbulbIcon, PiggyBank, Users } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: LightbulbIcon,
      title: "Buat Proyekmu",
      description:
        "Daftarkan ide riset dan penelitianmu dengan detail yang menarik dan target pendanaan yang jelas. Semakin detail dan menarik proyekmu, semakin besar peluang untuk mendapatkan dukungan.",
      details: [
        "Buat akun di ProyekSiswa.id",
        "Isi formulir pembuatan proyek dengan lengkap",
        "Unggah foto/video pendukung yang menarik",
        "Tentukan target pendanaan dan durasi kampanye",
        "Buat reward yang menarik untuk pendukung",
      ],
      image: "https://i.pinimg.com/736x/d6/d3/93/d6d393b75fe4a4e8081f96409826f775.jpg",
    },
    {
      icon: Users,
      title: "Dapatkan Dukungan",
      description:
        "Bagikan proyekmu dan kumpulkan dukungan dari komunitas dan mentor. Manfaatkan media sosial dan jaringan untuk mempromosikan proyekmu.",
      details: [
        "Bagikan proyek ke media sosial dan grup komunitas",
        "Dapatkan mentor yang sesuai dengan bidang proyekmu",
        "Terima masukan dan saran untuk perbaikan",
        "Bangun komunitas pendukung di sekitar proyekmu",
        "Update progress secara berkala untuk menjaga kepercayaan",
      ],
      image: "https://i.pinimg.com/736x/cc/05/31/cc05316b876f9f569240d56095b18e45.jpg",
    },
    {
      icon: PiggyBank,
      title: "Kumpulkan Dana",
      description:
        "Terima pendanaan dari para pendukung yang tertarik dengan idemu. Pantau perkembangan pendanaan dan berikan update rutin.",
      details: [
        "Pantau dashboard pendanaan secara real-time",
        "Kirim ucapan terima kasih kepada setiap pendukung",
        "Berikan update tentang penggunaan dana",
        "Siapkan reward sesuai dengan janji kampanye",
        "Jaga komunikasi dengan para pendukung",
      ],
      image: "https://i.pinimg.com/736x/fb/99/85/fb99852a13b4910cf8377397eabf7eb1.jpg",
    },
    {
      icon: CheckCircle2,
      title: "Wujudkan Ide",
      description:
        "Gunakan dana dan bimbingan untuk merealisasikan ide riset dan penelitianmu. Laporkan perkembangan dan hasil akhir kepada pendukung.",
      details: [
        "Buat rencana implementasi yang detail",
        "Gunakan dana sesuai dengan rencana yang telah dibuat",
        "Manfaatkan bimbingan mentor untuk pengembangan",
        "Dokumentasikan proses realisasi ide",
        "Bagikan kisah sukses untuk menginspirasi yang lain",
      ],
      image: "https://i.pinimg.com/736x/b2/0a/06/b20a065feae9c3f6fcab3d449f95e1ec.jpg",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const faqItems = [
    {
      question: "Siapa yang bisa membuat proyek di ProyekSiswa.id?",
      answer:
        "ProyekSiswa.id terbuka untuk semua pelajar dan mahasiswa di Indonesia yang memiliki ide riset dan penelitian inovatif. Kamu bisa mendaftar sebagai individu atau tim dengan minimal satu anggota yang masih berstatus pelajar atau mahasiswa aktif.",
    },
    {
      question: "Berapa biaya yang dikenakan untuk membuat proyek?",
      answer:
        "Membuat dan mengelola proyek di ProyekSiswa.id sepenuhnya GRATIS. Kami hanya mengenakan biaya administrasi sebesar 5% dari total dana yang berhasil terkumpul jika proyekmu mencapai target pendanaan.",
    },
    {
      question: "Bagaimana jika proyek tidak mencapai target pendanaan?",
      answer:
        "Kami menerapkan sistem 'All or Nothing', yang berarti jika proyekmu tidak mencapai target pendanaan dalam waktu yang ditentukan, semua dana akan dikembalikan kepada para pendukung tanpa potongan biaya apapun.",
    },
    {
      question: "Berapa lama proses verifikasi proyek?",
      answer:
        "Proses verifikasi proyek biasanya memakan waktu 1-3 hari kerja. Tim kami akan memeriksa kelengkapan dan kesesuaian proyek dengan ketentuan platform sebelum menyetujui untuk dipublikasikan.",
    },
    {
      question: "Apakah saya bisa mendapatkan mentor untuk proyek saya?",
      answer:
        "Ya, ProyekSiswa.id menyediakan fitur Mentorship Matching yang menghubungkan pelajar dengan mentor dari bidang terkait. Kamu bisa memilih mentor yang sesuai dengan kebutuhan proyekmu setelah proyek disetujui.",
    },
  ]

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
            Cara Kerja ProyekSiswa.id
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Pelajari bagaimana platform kami membantu pelajar dan mahasiswa mewujudkan ide riset dan penelitian mereka melalui
            crowdfunding
          </motion.p>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="md:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </motion.div>
                    <h2 className="text-2xl font-bold">
                      {index + 1}. {step.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 mb-6 text-lg">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <motion.div
                  className="md:w-1/2"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg w-full"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan umum tentang platform crowdfunding kami
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
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
          <h2 className="text-3xl font-bold mb-4">Siap Memulai Perjalanan Penelitianmu?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelajar dan mahasiswa yang telah mewujudkan ide riset dan penelitiannya melalui ProyekSiswa.id
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
