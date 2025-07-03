"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Clock, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/lib/midtrans"

interface EscrowSystemProps {
  projectId: string
  targetAmount: number
  currentAmount: number
  deadline: string
  status: "active" | "successful" | "failed" | "refunding"
}

export default function EscrowSystem({ projectId, targetAmount, currentAmount, deadline, status }: EscrowSystemProps) {
  const [timeLeft, setTimeLeft] = useState<string>("")
  const [escrowDetails, setEscrowDetails] = useState({
    totalFunds: currentAmount,
    pendingFunds: 0,
    releasedFunds: 0,
    refundedFunds: 0,
    donorCount: 0,
  })

  const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100)
  const isSuccessful = currentAmount >= targetAmount
  const deadlineDate = new Date(deadline)
  const isExpired = new Date() > deadlineDate

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date()
      const difference = deadlineDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      } else {
        setTimeLeft("Expired")
      }
    }

    updateTimeLeft()
    const interval = setInterval(updateTimeLeft, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [deadline])

  const getStatusInfo = () => {
    switch (status) {
      case "active":
        return {
          icon: Clock,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          text: "Kampanye Aktif",
          description: "Dana disimpan aman dalam escrow hingga target tercapai",
        }
      case "successful":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-100",
          text: "Target Tercapai",
          description: "Dana akan dirilis ke creator dalam 3-5 hari kerja",
        }
      case "failed":
        return {
          icon: AlertTriangle,
          color: "text-red-600",
          bgColor: "bg-red-100",
          text: "Target Tidak Tercapai",
          description: "Proses refund otomatis akan dimulai",
        }
      case "refunding":
        return {
          icon: RefreshCw,
          color: "text-orange-600",
          bgColor: "bg-orange-100",
          text: "Proses Refund",
          description: "Dana sedang dikembalikan ke donatur",
        }
      default:
        return {
          icon: Shield,
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          text: "Unknown",
          description: "",
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="space-y-6">
      {/* Escrow Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Escrow Protection System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-full ${statusInfo.bgColor}`}>
              <statusInfo.icon className={`h-6 w-6 ${statusInfo.color}`} />
            </div>
            <div>
              <h3 className="font-semibold">{statusInfo.text}</h3>
              <p className="text-sm text-gray-600">{statusInfo.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(escrowDetails.totalFunds)}</p>
              <p className="text-xs text-gray-500">Total Dana</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(escrowDetails.pendingFunds)}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(escrowDetails.releasedFunds)}</p>
              <p className="text-xs text-gray-500">Dirilis</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{formatCurrency(escrowDetails.refundedFunds)}</p>
              <p className="text-xs text-gray-500">Refund</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress Target</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatCurrency(currentAmount)} terkumpul</span>
              <span>Target: {formatCurrency(targetAmount)}</span>
            </div>
          </div>

          {!isExpired && status === "active" && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Waktu tersisa:</span>
                <Badge variant="outline">{timeLeft}</Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Escrow Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline Escrow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Kampanye Dimulai</p>
                <p className="text-sm text-gray-600">Dana donatur masuk ke escrow account</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === "active" ? "bg-blue-100" : "bg-green-100"
                }`}
              >
                <Clock className={`h-4 w-4 ${status === "active" ? "text-blue-600" : "text-green-600"}`} />
              </div>
              <div>
                <p className="font-medium">Periode Pendanaan</p>
                <p className="text-sm text-gray-600">Dana aman tersimpan hingga deadline</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isSuccessful ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                {isSuccessful ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </div>
              <div>
                <p className="font-medium">Evaluasi Target</p>
                <p className="text-sm text-gray-600">
                  {isSuccessful ? "Target tercapai, dana akan dirilis" : "Menunggu pencapaian target"}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  status === "successful"
                    ? "bg-green-100"
                    : status === "failed" || status === "refunding"
                      ? "bg-red-100"
                      : "bg-gray-100"
                }`}
              >
                {status === "successful" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : status === "failed" || status === "refunding" ? (
                  <RefreshCw className="h-4 w-4 text-red-600" />
                ) : (
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </div>
              <div>
                <p className="font-medium">
                  {status === "successful"
                    ? "Dana Dirilis"
                    : status === "failed" || status === "refunding"
                      ? "Refund Diproses"
                      : "Penyelesaian"}
                </p>
                <p className="text-sm text-gray-600">
                  {status === "successful"
                    ? "Dana dikirim ke creator"
                    : status === "failed" || status === "refunding"
                      ? "Dana dikembalikan ke donatur"
                      : "Dana akan dirilis atau di-refund"}
                </p>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Jaminan Keamanan Dana</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Dana disimpan dalam escrow account yang diawasi Bank Indonesia</li>
                <li>• Refund otomatis 100% jika target tidak tercapai</li>
                <li>• Sistem monitoring real-time untuk transparansi</li>
                <li>• Asuransi perlindungan dana hingga Rp 2 miliar</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
