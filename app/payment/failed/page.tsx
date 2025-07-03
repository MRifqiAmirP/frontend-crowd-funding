"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { XCircle, RefreshCw, ArrowLeft, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/ui/page-transition"
import { MotionButton } from "@/components/ui/motion-button"

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      // Fetch payment details
      const mockDetails = {
        orderId,
        projectTitle: "EcoBag - Tas Ramah Lingkungan dari Limbah Tekstil",
        projectId: "1",
        amount: 250000,
        failureReason: "Insufficient funds",
      }
      setPaymentDetails(mockDetails)
    }
  }, [orderId])

  const commonIssues = [
    {
      issue: "Saldo tidak mencukupi",
      solution: "Pastikan saldo rekening atau kartu kredit Anda mencukupi",
    },
    {
      issue: "Kartu kedaluwarsa",
      solution: "Periksa tanggal kedaluwarsa kartu kredit/debit Anda",
    },
    {
      issue: "Koneksi internet terputus",
      solution: "Pastikan koneksi internet stabil saat melakukan pembayaran",
    },
    {
      issue: "Limit transaksi terlampaui",
      solution: "Hubungi bank untuk menaikkan limit transaksi harian",
    },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {/* Failed Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <XCircle className="h-12 w-12 text-red-600" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                Pembayaran Gagal
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600"
              >
                Terjadi kesalahan saat memproses pembayaran Anda
              </motion.p>
            </div>

            {/* Error Details */}
            {paymentDetails && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card className="mb-6 border-red-200">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Detail Transaksi</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID</span>
                        <span className="font-mono text-sm">{paymentDetails.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Proyek</span>
                        <span className="font-medium text-right max-w-xs">{paymentDetails.projectTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className="text-red-600 font-medium">Gagal</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              <MotionButton asChild className="flex items-center justify-center gap-2">
                <Link href={paymentDetails ? `/projects/${paymentDetails.projectId}` : "/projects"}>
                  <RefreshCw className="h-4 w-4" />
                  Coba Lagi
                </Link>
              </MotionButton>

              <MotionButton variant="outline" asChild className="flex items-center justify-center gap-2">
                <Link href="/projects">
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Proyek
                </Link>
              </MotionButton>
            </motion.div>

            {/* Common Issues */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    Masalah Umum & Solusi
                  </h3>
                  <div className="space-y-4">
                    {commonIssues.map((item, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4">
                        <h4 className="font-medium text-sm">{item.issue}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.solution}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8"
            >
              <p className="text-gray-600 mb-4">Masih mengalami masalah? Tim support kami siap membantu</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MotionButton variant="outline" asChild>
                  <Link href="/help">Pusat Bantuan</Link>
                </MotionButton>
                <MotionButton variant="outline" asChild>
                  <Link href="/contact">Hubungi Support</Link>
                </MotionButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
