"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, TrendingUp, Users, Download, Search, Eye, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageTransition } from "@/components/ui/page-transition"
import { formatCurrency } from "@/lib/midtrans"

export default function PaymentsDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Mock payment data
  const paymentStats = {
    totalReceived: 45750000,
    pendingAmount: 8500000,
    totalDonors: 234,
    averageDonation: 195513,
    monthlyGrowth: 12.5,
  }

  const payments = [
    {
      id: "PROJ-1-1703123456-ABC123",
      projectTitle: "EcoBag - Tas Ramah Lingkungan",
      donorName: "Budi Santoso",
      amount: 250000,
      platformFee: 12500,
      netAmount: 237500,
      status: "success",
      paymentMethod: "Credit Card",
      date: "2023-12-20T10:30:00Z",
      rewardTitle: "Premium Bundle",
    },
    {
      id: "PROJ-2-1703123457-DEF456",
      projectTitle: "NutriApp - Aplikasi Gizi Seimbang",
      donorName: "Siti Nurhaliza",
      amount: 100000,
      platformFee: 5000,
      netAmount: 95000,
      status: "pending",
      paymentMethod: "Bank Transfer",
      date: "2023-12-20T09:15:00Z",
      rewardTitle: "Early Bird",
    },
    {
      id: "PROJ-1-1703123458-GHI789",
      projectTitle: "EcoBag - Tas Ramah Lingkungan",
      donorName: "Ahmad Fauzi",
      amount: 500000,
      platformFee: 25000,
      netAmount: 475000,
      status: "success",
      paymentMethod: "E-Wallet (GoPay)",
      date: "2023-12-19T16:45:00Z",
      rewardTitle: "Supporter Plus",
    },
    {
      id: "PROJ-3-1703123459-JKL012",
      projectTitle: "EduFarm - Sistem Hidroponik",
      donorName: "Lisa Wijaya",
      amount: 150000,
      platformFee: 7500,
      netAmount: 142500,
      status: "failed",
      paymentMethod: "Credit Card",
      date: "2023-12-19T14:20:00Z",
      rewardTitle: "Basic Package",
    },
    {
      id: "PROJ-2-1703123460-MNO345",
      projectTitle: "NutriApp - Aplikasi Gizi Seimbang",
      donorName: "Reza Pratama",
      amount: 75000,
      platformFee: 3750,
      netAmount: 71250,
      status: "success",
      paymentMethod: "Bank Transfer (BCA)",
      date: "2023-12-18T11:30:00Z",
      rewardTitle: "Supporter",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "Berhasil"
      case "pending":
        return "Pending"
      case "failed":
        return "Gagal"
      case "refunded":
        return "Refund"
      default:
        return status
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Payment Dashboard</h1>
            <p className="text-gray-600">Kelola dan monitor semua transaksi pembayaran</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Diterima</p>
                    <p className="text-2xl font-bold">{formatCurrency(paymentStats.totalReceived)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">+{paymentStats.monthlyGrowth}% dari bulan lalu</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold">{formatCurrency(paymentStats.pendingAmount)}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                </div>
                <p className="text-xs text-gray-600 mt-2">Menunggu konfirmasi</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Donatur</p>
                    <p className="text-2xl font-bold">{paymentStats.totalDonors}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-blue-600 mt-2">+18 donatur baru</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rata-rata Donasi</p>
                    <p className="text-2xl font-bold">{formatCurrency(paymentStats.averageDonation)}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-purple-600 mt-2">Per transaksi</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Transaksi</CardTitle>
                <CardDescription>Daftar semua transaksi pembayaran untuk proyek Anda</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Cari berdasarkan nama, proyek, atau order ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="success">Berhasil</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Gagal</SelectItem>
                      <SelectItem value="refunded">Refund</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter Tanggal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Waktu</SelectItem>
                      <SelectItem value="today">Hari Ini</SelectItem>
                      <SelectItem value="week">7 Hari Terakhir</SelectItem>
                      <SelectItem value="month">30 Hari Terakhir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium">Donatur</th>
                        <th className="text-left py-3 px-4 font-medium">Proyek</th>
                        <th className="text-left py-3 px-4 font-medium">Jumlah</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Metode</th>
                        <th className="text-left py-3 px-4 font-medium">Tanggal</th>
                        <th className="text-left py-3 px-4 font-medium">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map((payment, index) => (
                        <motion.tr
                          key={payment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <span className="font-mono text-xs">{payment.id}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{payment.donorName}</p>
                              {payment.rewardTitle && <p className="text-xs text-gray-500">{payment.rewardTitle}</p>}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-sm max-w-xs truncate">{payment.projectTitle}</p>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{formatCurrency(payment.amount)}</p>
                              <p className="text-xs text-gray-500">Net: {formatCurrency(payment.netAmount)}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(payment.status)}>{getStatusText(payment.status)}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm">{payment.paymentMethod}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm">{new Date(payment.date).toLocaleDateString("id-ID")}</span>
                          </td>
                          <td className="py-3 px-4">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredPayments.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Tidak ada transaksi yang ditemukan</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Metode Pembayaran Populer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { method: "Credit Card", percentage: 45, amount: "Rp 20.6M" },
                      { method: "Bank Transfer", percentage: 30, amount: "Rp 13.7M" },
                      { method: "E-Wallet", percentage: 20, amount: "Rp 9.2M" },
                      { method: "Convenience Store", percentage: 5, amount: "Rp 2.3M" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{item.method}</span>
                            <span className="text-sm text-gray-600">{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                          </div>
                        </div>
                        <span className="ml-4 text-sm font-medium">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tren Pembayaran Bulanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "Desember", amount: 15750000, growth: 12.5 },
                      { month: "November", amount: 14200000, growth: 8.3 },
                      { month: "Oktober", amount: 13100000, growth: 15.2 },
                      { month: "September", amount: 11400000, growth: 5.7 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.month}</p>
                          <p className="text-sm text-gray-600">{formatCurrency(item.amount)}</p>
                        </div>
                        <Badge
                          className={item.growth > 10 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                        >
                          +{item.growth}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="refunds">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Refund</CardTitle>
                <CardDescription>Kelola permintaan refund dan pengembalian dana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Belum ada permintaan refund</p>
                  <p className="text-sm text-gray-400">
                    Refund akan muncul di sini jika ada proyek yang tidak mencapai target
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
