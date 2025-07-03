import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, Shield, Users, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - ProyekSiswa.id",
  description: "Syarat dan ketentuan penggunaan platform ProyekSiswa.id",
}

export default function TermsPage() {
  const lastUpdated = "15 Januari 2025"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Syarat & Ketentuan</h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">Ketentuan penggunaan platform ProyekSiswa.id</p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Terakhir diperbarui: {lastUpdated}</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Navigasi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Definisi",
                "Akun Pengguna",
                "Proyek & Pendanaan",
                "Pembayaran",
                "Hak & Kewajiban",
                "Privasi",
                "Pelanggaran",
                "Kontak",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-blue-600 hover:text-blue-800 text-sm hover:underline"
                >
                  {item}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* 1. Definisi */}
          <Card id="definisi">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                Definisi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Platform</h4>
                  <p className="text-gray-600">
                    ProyekSiswa.id adalah platform crowdfunding pendidikan yang menghubungkan pelajar/mahasiswa dengan pendana
                    untuk mendukung proyek riset dan penelitian.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Pengguna</h4>
                  <p className="text-gray-600">
                    Individu atau entitas yang menggunakan platform, termasuk pelajar, mahasiswa, pendana, dan mentor.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Proyek</h4>
                  <p className="text-gray-600">
                    Inisiatif riset dan penelitian yang diajukan oleh pelajar/mahasiswa untuk mendapatkan pendanaan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Akun Pengguna */}
          <Card id="akun-pengguna">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                Akun Pengguna
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    Pengguna harus berusia minimal 14 tahun.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Informasi yang diberikan harus akurat, lengkap, dan terkini.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Pengguna bertanggung jawab menjaga keamanan akun dan kata sandi.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Satu orang hanya diperbolehkan memiliki satu akun aktif.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Proyek & Pendanaan */}
          <Card id="proyek-&-pendanaan">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  3
                </span>
                Proyek & Pendanaan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Persyaratan Proyek:</h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">Proyek harus bersifat jelas dan bermanfaat bagi masyarakat</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">Tidak melanggar hukum atau norma yang berlaku</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">Memiliki rencana bisnis yang jelas dan realistis</p>
                  </div>
                </div>
              </div>
              <Separator/>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Ketentuan Pengajuan Projek:</h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">Berstatus sebagai mahasiswa atau pelajar aktif atau alumni perguruan tinggi di Indonesia</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">Memiliki KTP dan kartu pelajar/mahasiswa yang masih berlaku, untuk yang dibawah 17 tahun diwajibkan untuk memiliki surat persetujuan orang tua dan penanggungjawab akademisi</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">memiliki surat rekomendasi dari pembimbing atau institusi (opsional, tapi disarankan)</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">
                    Proyek yang relevan dengan Tujuan Pembangunan Berkelanjutan (SDGs) atau isu sosial, lingkungan, dan teknologi
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">
                    Melampirkan berbagai dokumen persyaratan yang dibutuhkan
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">
                    Proyek belum menerima pendanaan komersial lain (kecuali hibah atau beasiswa) atau tidak tumpang tindih dengan platform crowdfunding lain tanpa persetujuan
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">
                    Proyek harus memberikan laporan perkembangan rutin setiap bulan
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">
                    Penggunaan dana harus sesuai dengan RAB, dan penyimpangan dapat dikenakan sanksi
                    </p>
                  </div>
                </div>
              </div>
              <Separator/>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Ketentuan Pendanaan:</h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">Platform mengenakan biaya layanan 5% dari total dana terkumpul</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">Dana akan dicairkan setelah target minimum tercapai</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600">
                      Pengembalian dana otomatis jika target tidak tercapai dalam batas waktu
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Pembayaran */}
          <Card id="pembayaran">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Penting untuk Diketahui</h4>
                    <p className="text-yellow-700 text-sm">
                      Semua transaksi diproses melalui gateway pembayaran yang aman dan terenkripsi.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    Pembayaran dapat dilakukan melalui transfer bank, e-wallet, atau kartu kredit/debit
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    Konfirmasi pembayaran akan dikirim melalui email dan notifikasi platform
                  </p>
                </div>
                {/* <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Refund akan diproses dalam 7-14 hari kerja sesuai kebijakan bank</p>
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* 5. Hak & Kewajiban */}
          <Card id="hak-&-kewajiban">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  5
                </span>
                Hak & Kewajiban
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Hak Pengguna
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm">Mengakses semua fitur platform</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm">Mendapat dukungan teknis</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm">Privasi data terlindungi</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Kewajiban Pengguna
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm">Mematuhi semua ketentuan</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm">Memberikan informasi akurat</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm">Menghormati pengguna lain</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6. Privasi */}
          <Card id="privasi">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  6
                </span>
                Privasi & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Kami berkomitmen melindungi privasi pengguna. Data pribadi akan digunakan sesuai dengan
                <a href="/privacy" className="text-blue-600 hover:underline ml-1">
                  Kebijakan Privasi
                </a>{" "}
                kami.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Enkripsi Data</h5>
                  <p className="text-blue-700 text-sm">Semua data dienkripsi dengan standar industri</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">Akses Terbatas</h5>
                  <p className="text-green-700 text-sm">Hanya tim authorized yang dapat mengakses data</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">Kontrol Pengguna</h5>
                  <p className="text-purple-700 text-sm">Pengguna dapat mengatur preferensi privasi</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7. Pelanggaran */}
          <Card id="pelanggaran">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  7
                </span>
                Pelanggaran & Sanksi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-3">Tindakan yang Dilarang:</h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-red-700 text-sm">Menyebarkan konten yang melanggar hukum atau norma</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-red-700 text-sm">Melakukan penipuan atau memberikan informasi palsu</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-red-700 text-sm">Mengganggu atau merugikan pengguna lain</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Sanksi yang Dapat Diberikan:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">
                    Peringatan
                  </Badge>
                  <Badge variant="outline" className="bg-orange-50 text-orange-800 border-orange-300">
                    Pembatasan Fitur
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-800 border-red-300">
                    Suspensi Akun
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-300">
                    Penutupan Permanen
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 8. Kontak */}
          <Card id="kontak">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  8
                </span>
                Hubungi Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Email</h5>
                  <p className="text-blue-700">proyeksiswaa@gmail.com</p>
                </div>
                {/* <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">Pusat Bantuan</h5>
                  <a href="/help" className="text-green-700 hover:underline">
                    help.proyeksiswa.id
                  </a>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600 text-sm">
              Dengan menggunakan platform ProyekSiswa.id, Anda menyetujui semua syarat dan ketentuan yang berlaku. Kami
              berhak mengubah ketentuan ini sewaktu-waktu dengan pemberitahuan sebelumnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
