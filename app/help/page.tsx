import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  BookOpen,
  Users,
  CreditCard,
  Shield,
  HelpCircle,
  ChevronRight,
  Clock,
  CheckCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Pusat Bantuan - ProyekSiswa.id",
  description: "Temukan jawaban untuk pertanyaan Anda tentang ProyekSiswa.id",
}

export default function HelpPage() {
  const faqData = {
    general: [
      {
        question: "Apa itu ProyekSiswa.id?",
        answer:
          "ProyekSiswa.id adalah platform crowdfunding pendidikan pertama di Indonesia yang didedikasikan untuk mendukung proyek riset dan penelitian pelajar/mahasiswa. Kami menghubungkan siswa dengan ide inovatif kepada pendana yang ingin mendukung.",
      },
      {
        question: "Siapa yang bisa menggunakan platform ini?",
        answer:
          "Platform ini terbuka untuk pelajar SMA, mahasiswa, pendana individu, perusahaan, dan mentor yang ingin mendukung ekosistem penelitian/pendidikan di Indonesia.",
      },
      {
        question: "Apakah gratis untuk membuat akun?",
        answer:
          "Ya, membuat akun di ProyekSiswa.id sepenuhnya gratis. Kami hanya mengenakan biaya layanan 5% dari total dana yang berhasil terkumpul untuk proyek yang berhasil mencapai target.",
      },
    ],
    projects: [
      {
        question: "Bagaimana cara membuat proyek?",
        answer:
          "Untuk membuat proyek, login ke akun Anda, klik 'Buat Proyek', isi formulir dengan detail proyek, upload dokumen pendukung, dan tunggu proses verifikasi dari tim kami.",
      },
      {
        question: "Berapa lama proses verifikasi proyek?",
        answer:
          "Proses verifikasi biasanya memakan waktu 3-5 hari kerja. Tim kami akan meninjau kelengkapan dokumen, kelayakan proyek, dan kesesuaian dengan guidelines platform.",
      },
      {
        question: "Apa yang terjadi jika proyek tidak mencapai target?",
        answer:
          "Jika proyek tidak mencapai target minimum dalam batas waktu yang ditentukan, semua dana akan dikembalikan kepada pendana secara otomatis tanpa biaya tambahan.",
      },
    ],
    payment: [
      {
        question: "Metode pembayaran apa saja yang tersedia?",
        answer:
          "Kami menerima pembayaran melalui transfer bank, e-wallet (GoPay, OVO, DANA), kartu kredit/debit, dan virtual account dari berbagai bank.",
      },
      {
        question: "Kapan dana akan dicairkan ke pemilik proyek?",
        answer:
          "Dana akan dicairkan setelah proyek mencapai target minimum dan melewati periode verifikasi 7 hari. Pencairan dilakukan dalam 2-3 hari kerja setelah verifikasi selesai.",
      },
      {
        question: "Bagaimana cara refund jika proyek gagal?",
        answer:
          "Refund akan diproses otomatis dalam 7-14 hari kerja ke metode pembayaran yang sama. Anda akan menerima notifikasi email ketika refund telah diproses.",
      },
    ],
    security: [
      {
        question: "Seberapa aman data pribadi saya?",
        answer:
          "Data Anda dilindungi dengan enkripsi SSL/TLS dan disimpan di server yang aman. Kami tidak pernah membagikan data pribadi kepada pihak ketiga tanpa persetujuan Anda.",
      },
      {
        question: "Bagaimana cara melaporkan proyek yang mencurigakan?",
        answer:
          "Anda dapat melaporkan proyek mencurigakan melalui tombol 'Laporkan' di halaman proyek atau menghubungi tim support kami. Setiap laporan akan ditindaklanjuti dalam 24 jam.",
      },
    ],
  }

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat langsung dengan tim support",
      availability: "24/7",
      action: "Mulai Chat",
      color: "blue",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "proyeksiswaa@gmail.com",
      availability: "Respon dalam 2-4 jam",
      action: "Kirim Email",
      color: "green",
    },
    {
      icon: Phone,
      title: "Telepon",
      description: "+62 898 3064 613",
      availability: "Senin-Jumat 09:00-17:00",
      action: "Hubungi Sekarang",
      color: "orange",
    },
  ]

  const quickLinks = [
    { title: "Panduan Membuat Proyek", icon: BookOpen, href: "/guide/create-project" },
    { title: "Cara Mendanai Proyek", icon: CreditCard, href: "/guide/funding" },
    { title: "Keamanan Akun", icon: Shield, href: "/guide/security" },
    { title: "Komunitas & Forum", icon: Users, href: "/community" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Pusat Bantuan</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Temukan jawaban untuk pertanyaan Anda atau hubungi tim support kami
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Cari bantuan, panduan, atau FAQ..."
              className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
              Cari
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {quickLinks.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <link.icon className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {link.title}
                </h3>
                <ChevronRight className="h-4 w-4 text-gray-400 mx-auto mt-2 group-hover:text-blue-600 transition-colors" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Pertanyaan yang Sering Diajukan (FAQ)</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">Umum</TabsTrigger>
                    <TabsTrigger value="projects">Proyek</TabsTrigger>
                    <TabsTrigger value="payment">Pembayaran</TabsTrigger>
                    <TabsTrigger value="security">Keamanan</TabsTrigger>
                  </TabsList>

                  {Object.entries(faqData).map(([category, faqs]) => (
                    <TabsContent key={category} value={category} className="mt-6">
                      <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`${category}-${index}`}>
                            <AccordionTrigger className="text-left hover:text-blue-600">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Status System */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  Status Sistem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="font-medium text-green-800">Platform Website</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="font-medium text-green-800">Payment Gateway</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="font-medium text-green-800">Email Service</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Hubungi Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportChannels.map((channel, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 border-${channel.color}-200 bg-${channel.color}-50`}
                  >
                    <div className="flex items-start">
                      <channel.icon className={`h-6 w-6 text-${channel.color}-600 mr-3 mt-1`} />
                      <div className="flex-1">
                        <h4 className={`font-semibold text-${channel.color}-800 mb-1`}>{channel.title}</h4>
                        <p className={`text-${channel.color}-700 text-sm mb-2`}>{channel.description}</p>
                        <div className="flex items-center text-xs text-gray-600 mb-3">
                          <Clock className="h-3 w-3 mr-1" />
                          {channel.availability}
                        </div>
                        <Button
                          size="sm"
                          className={`bg-${channel.color}-600 hover:bg-${channel.color}-700 text-white`}
                        >
                          {channel.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Artikel Populer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Cara Membuat Proyek yang Menarik",
                    "Tips Mendapatkan Pendanaan",
                    "Panduan Keamanan Akun",
                    "Strategi Marketing Proyek",
                    "Mengelola Dana Proyek",
                  ].map((article, index) => (
                    <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer group">
                      <BookOpen className="h-4 w-4 text-gray-400 mr-3 group-hover:text-blue-600" />
                      <span className="text-sm text-gray-700 group-hover:text-blue-600">{article}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-blue-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Komunitas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Bergabung dengan komunitas ProyekSiswa.id untuk berbagi pengalaman dan mendapatkan tips dari sesama
                  entrepreneur muda.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Gabung Komunitas</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Masih Butuh Bantuan?</h3>
              <p className="text-blue-100 mb-6">
                Tim support kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Mail className="h-4 w-4 mr-2" />
                  Kirim Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
