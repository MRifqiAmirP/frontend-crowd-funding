import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Shield, Eye, Lock, Database, UserCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Kebijakan Privasi - ProyekSiswa.id",
  description: "Kebijakan privasi dan perlindungan data ProyekSiswa.id",
}

export default function PrivacyPage() {
  const lastUpdated = "01 Juni 2025"

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Kebijakan Privasi</h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">Komitmen kami dalam melindungi privasi dan data Anda</p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Terakhir diperbarui: {lastUpdated}</span>
          </div>
        </div>

        {/* Privacy Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <Lock className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800 mb-2">Enkripsi End-to-End</h3>
              <p className="text-green-700 text-sm">Data Anda dienkripsi dengan standar militer</p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800 mb-2">Transparansi Penuh</h3>
              <p className="text-blue-700 text-sm">Kami terbuka tentang penggunaan data Anda</p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <UserCheck className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-purple-800 mb-2">Kontrol Penuh</h3>
              <p className="text-purple-700 text-sm">Anda mengontrol data pribadi Anda</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* 1. Informasi yang Kami Kumpulkan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-6 w-6 text-blue-600 mr-3" />
                Informasi yang Kami Kumpulkan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Informasi Pribadi</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-blue-700 text-sm">Nama lengkap</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-blue-700 text-sm">Alamat email</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-blue-700 text-sm">Nomor telepon</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-blue-700 text-sm">Tanggal lahir</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Informasi Teknis</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      <span className="text-green-700 text-sm">Alamat IP</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      <span className="text-green-700 text-sm">Browser & perangkat</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      <span className="text-green-700 text-sm">Aktivitas platform</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      <span className="text-green-700 text-sm">Cookies & tracking</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Bagaimana Kami Menggunakan Informasi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-6 w-6 text-green-600 mr-3" />
                Bagaimana Kami Menggunakan Informasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Verifikasi Identitas</h4>
                    <p className="text-gray-600 text-sm">
                      Memverifikasi identitas pengguna untuk keamanan platform dan mencegah penipuan.
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Keamanan Platform</h4>
                    <p className="text-gray-600 text-sm">
                      Melindungi platform dari aktivitas mencurigakan dan menjaga keamanan semua pengguna.
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <Database className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Personalisasi Layanan</h4>
                    <p className="text-gray-600 text-sm">
                      Menyediakan rekomendasi proyek dan konten yang relevan dengan minat Anda.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Berbagi Informasi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-6 w-6 text-orange-600 mr-3" />
                Kapan Kami Berbagi Informasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-orange-800 mb-2">Prinsip Utama</h4>
                <p className="text-orange-700 text-sm">
                  Kami TIDAK PERNAH menjual data pribadi Anda kepada pihak ketiga untuk tujuan komersial.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Dengan Persetujuan Anda</h5>
                    <p className="text-gray-600 text-sm">Hanya ketika Anda memberikan izin eksplisit</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Kewajiban Hukum</h5>
                    <p className="text-gray-600 text-sm">Ketika diwajibkan oleh hukum atau perintah pengadilan</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Penyedia Layanan</h5>
                    <p className="text-gray-600 text-sm">Dengan partner tepercaya yang membantu operasional platform</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Keamanan Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                Keamanan Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Teknologi Keamanan</h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Badge className="bg-green-100 text-green-800 mr-3">SSL/TLS</Badge>
                      <span className="text-green-700 text-sm">Enkripsi data dalam transit</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Badge className="bg-blue-100 text-blue-800 mr-3">AES-256</Badge>
                      <span className="text-blue-700 text-sm">Enkripsi data tersimpan</span>
                    </div>
                    <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                      <Badge className="bg-purple-100 text-purple-800 mr-3">2FA</Badge>
                      <span className="text-purple-700 text-sm">Autentikasi dua faktor</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Praktik Keamanan</h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm">Audit keamanan berkala</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm">Akses terbatas ke data</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm">Monitoring 24/7</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm">Backup data terenkripsi</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Hak Pengguna */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-6 w-6 text-purple-600 mr-3" />
                Hak-Hak Anda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-3">Akses & Kontrol</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span className="text-purple-700 text-sm">Akses data pribadi</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span className="text-purple-700 text-sm">Koreksi data</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span className="text-purple-700 text-sm">Hapus akun</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Preferensi</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-blue-700 text-sm">Pengaturan privasi</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-blue-700 text-sm">Notifikasi email</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-blue-700 text-sm">Cookie preferences</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6. Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-6 w-6 text-orange-600 mr-3" />
                Penggunaan Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Essential Cookies</h4>
                  <p className="text-green-700 text-sm">Diperlukan untuk fungsi dasar platform</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Analytics Cookies</h4>
                  <p className="text-blue-700 text-sm">Membantu kami memahami penggunaan platform</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Marketing Cookies</h4>
                  <p className="text-purple-700 text-sm">Untuk personalisasi konten dan iklan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7. Kontak */}
          <Card>
            <CardHeader>
              <CardTitle>Hubungi Tim Privasi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Jika Anda memiliki pertanyaan tentang privasi atau ingin menggunakan hak-hak Anda:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Email Privasi</h5>
                  <p className="text-blue-700">proyeksiswaa@gmail.com</p>
                </div>
                {/* <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">Data Protection Officer</h5>
                  <p className="text-green-700">dpo@proyeksiswa.id</p>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600 text-sm">
              Kebijakan privasi ini dapat berubah sewaktu-waktu. Kami akan memberitahu Anda tentang perubahan penting
              melalui email atau notifikasi platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
