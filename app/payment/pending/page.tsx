"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, RefreshCw, AlertCircle, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PageTransition } from "@/components/ui/page-transition"
import { formatCurrency } from "@/lib/midtrans"

interface PendingPaymentDetails {
  orderId: string
  amount: number
  totalAmount: number
  paymentMethod: string
  virtualAccount?: string
  storeCode?: string
  qrCode?: string
  expiryTime: string
  instructions: string[]
}

export default function PaymentPendingPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")
  const [paymentDetails, setPaymentDetails] = useState<PendingPaymentDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    if (orderId) {
      // Simulate fetching payment details
      setTimeout(() => {
        const expiryTime = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour from now
        setPaymentDetails({
          orderId,
          amount: 100000,
          totalAmount: 105500,
          paymentMethod: "Bank Transfer BCA",
          virtualAccount: "1234567890123456",
          expiryTime,
          instructions: [
            "Buka aplikasi mobile banking atau ATM BCA",
            "Pilih menu Transfer > Virtual Account",
            "Masukkan nomor Virtual Account: 1234567890123456",
            "Masukkan jumlah yang harus dibayar: Rp 105.500",
            "Konfirmasi dan selesaikan pembayaran",
            "Simpan bukti pembayaran untuk referensi",
          ],
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [orderId])

  useEffect(() => {
    if (paymentDetails) {
      const updateTimer = () => {
        const now = new Date().getTime()
        const expiry = new Date(paymentDetails.expiryTime).getTime()
        const difference = expiry - now

        if (difference > 0) {
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((difference % (1000 * 60)) / 1000)
          setTimeLeft(
            `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
          )
        } else {
          setTimeLeft("Expired")
        }
      }

      updateTimer()
      const timer = setInterval(updateTimer, 1000)
      return () => clearInterval(timer)
    }
  }, [paymentDetails])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Nomor Virtual Account telah disalin!")
  }

  const checkPaymentStatus = async () => {
    // Simulate checking payment status
    alert("Mengecek status pembayaran...")
  }

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat detail pembayaran...</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (!paymentDetails) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="text-center py-8">
              <p className="text-gray-600 mb-4">Detail pembayaran tidak ditemukan</p>
              <Button asChild>
                <Link href="/">Kembali ke Beranda</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            {/* Pending Status */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-12 w-12 text-orange-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pembayaran Menunggu</h1>
              <p className="text-gray-600">Silakan selesaikan pembayaran Anda sesuai instruksi di bawah</p>
            </motion.div>

            {/* Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="py-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Batas Waktu Pembayaran</span>
                  </div>
                  <div className="text-3xl font-bold text-orange-600 font-mono">{timeLeft}</div>
                  <p className="text-sm text-orange-700 mt-1">
                    Pembayaran akan otomatis dibatalkan setelah batas waktu berakhir
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Detail Pembayaran</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Menunggu
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Order ID</p>
                      <p className="font-mono font-medium">{paymentDetails.orderId}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Metode Pembayaran</p>
                      <p className="font-medium">{paymentDetails.paymentMethod}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total yang Harus Dibayar</span>
                    <span className="text-orange-600">{formatCurrency(paymentDetails.totalAmount)}</span>
                  </div>

                  {paymentDetails.virtualAccount && (
                    <>
                      <Separator />
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-blue-900">Nomor Virtual Account</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(paymentDetails.virtualAccount!)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-2xl font-mono font-bold text-blue-600 tracking-wider">
                          {paymentDetails.virtualAccount}
                        </p>
                        <p className="text-xs text-blue-700 mt-1">Klik ikon copy untuk menyalin nomor</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Instructions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Cara Pembayaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentDetails.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <p className="text-sm text-gray-700">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              <Button onClick={checkPaymentStatus} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Cek Status Pembayaran
              </Button>
              <Button variant="outline" asChild className="flex items-center gap-2">
                <Link href="/help/payment" target="_blank">
                  <ExternalLink className="h-4 w-4" />
                  Bantuan Pembayaran
                </Link>
              </Button>
            </motion.div>

            {/* Important Notes */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900">Penting untuk Diperhatikan</p>
                      <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                        <li>• Pastikan jumlah yang dibayar sesuai dengan total yang tertera</li>
                        <li>• Pembayaran akan otomatis terverifikasi dalam 1-3 menit</li>
                        <li>• Jangan tutup halaman ini sampai pembayaran selesai</li>
                        <li>• Hubungi customer service jika mengalami kendala</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Back to Home */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center mt-8"
            >
              <Button variant="ghost" asChild>
                <Link href="/">Kembali ke Beranda</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
