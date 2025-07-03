"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Upload, Info, Plus, Trash2 } from "lucide-react"

export default function CreateProjectPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("informasi")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rewards, setRewards] = useState([{ title: "", amount: "", description: "" }])

  const handleAddReward = () => {
    setRewards([...rewards, { title: "", amount: "", description: "" }])
  }

  const handleRemoveReward = (index: number) => {
    const newRewards = [...rewards]
    newRewards.splice(index, 1)
    setRewards(newRewards)
  }

  const handleRewardChange = (index: number, field: string, value: string) => {
    const newRewards = [...rewards]
    newRewards[index] = { ...newRewards[index], [field]: value }
    setRewards(newRewards)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Proyek berhasil dibuat!",
        description: "Proyek Anda sedang dalam peninjauan oleh tim kami.",
      })
      setIsSubmitting(false)
      router.push("/dashboard/projects")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Buat Proyek Baru</h1>
        <p className="text-gray-600 mb-8">
          Isi formulir berikut untuk membuat kampanye crowdfunding untuk proyek kewirausahaanmu
        </p>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="informasi">Informasi Dasar</TabsTrigger>
              <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <Card>
              <TabsContent value="informasi">
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                  <CardDescription>Masukkan informasi dasar tentang proyekmu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul Proyek</Label>
                      <Input id="title" placeholder="Masukkan judul proyek yang menarik" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Kategori</Label>
                        <Select required>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="teknologi">Teknologi</SelectItem>
                            <SelectItem value="edukasi">Edukasi</SelectItem>
                            <SelectItem value="lingkungan">Lingkungan</SelectItem>
                            <SelectItem value="kesehatan">Kesehatan</SelectItem>
                            <SelectItem value="sosial">Sosial</SelectItem>
                            <SelectItem value="agrikultur">Agrikultur</SelectItem>
                            <SelectItem value="seni">Seni & Budaya</SelectItem>
                            <SelectItem value="ecommerce">E-Commerce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="school">Sekolah/Kampus</Label>
                        <Input id="school" placeholder="Nama sekolah atau kampus" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="target">Target Dana (Rp)</Label>
                        <Input
                          id="target"
                          type="number"
                          min="1000000"
                          step="100000"
                          placeholder="Contoh: 10000000"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Durasi Kampanye (Hari)</Label>
                        <Input id="duration" type="number" min="7" max="60" placeholder="Contoh: 30" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="short-desc">Deskripsi Singkat</Label>
                      <Textarea
                        id="short-desc"
                        placeholder="Jelaskan secara singkat tentang proyekmu (maksimal 200 karakter)"
                        maxLength={200}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setActiveTab("deskripsi")}>
                      Selanjutnya
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="deskripsi">
                <CardHeader>
                  <CardTitle>Deskripsi Proyek</CardTitle>
                  <CardDescription>Jelaskan secara detail tentang proyekmu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-desc">Deskripsi Lengkap</Label>
                    <Textarea
                      id="full-desc"
                      placeholder="Jelaskan secara detail tentang proyekmu, termasuk latar belakang, tujuan, dan rencana penggunaan dana"
                      className="min-h-[300px]"
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("informasi")}>
                      Sebelumnya
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("media")}>
                      Selanjutnya
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="media">
                <CardHeader>
                  <CardTitle>Media Proyek</CardTitle>
                  <CardDescription>Unggah gambar atau video untuk proyekmu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Gambar Utama</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500 mb-2">Klik atau seret file ke sini</p>
                        <p className="text-xs text-gray-400">PNG, JPG, atau GIF (maks. 5MB)</p>
                        <Input type="file" className="hidden" accept="image/*" />
                        <Button type="button" variant="outline" size="sm" className="mt-4">
                          Pilih File
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Galeri Proyek (Opsional)</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500 mb-2">Unggah hingga 5 gambar tambahan</p>
                        <p className="text-xs text-gray-400">PNG, JPG, atau GIF (maks. 5MB per file)</p>
                        <Input type="file" className="hidden" accept="image/*" multiple />
                        <Button type="button" variant="outline" size="sm" className="mt-4">
                          Pilih File
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Video Proyek (Opsional)</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500 mb-2">Unggah video atau masukkan URL YouTube/Vimeo</p>
                        <p className="text-xs text-gray-400">MP4, MOV (maks. 50MB) atau URL</p>
                        <div className="flex gap-2 mt-4 justify-center">
                          <Button type="button" variant="outline" size="sm">
                            Pilih File
                          </Button>
                          <Input placeholder="Atau masukkan URL video" className="max-w-xs" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("deskripsi")}>
                      Sebelumnya
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("rewards")}>
                      Selanjutnya
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="rewards">
                <CardHeader>
                  <CardTitle>Rewards</CardTitle>
                  <CardDescription>Tentukan rewards untuk pendukung proyekmu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="h-4 w-4 text-blue-500" />
                    <p className="text-sm text-gray-600">
                      Rewards yang menarik dapat meningkatkan jumlah pendukung proyekmu
                    </p>
                  </div>

                  {rewards.map((reward, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Reward #{index + 1}</h3>
                        {rewards.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveReward(index)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`reward-title-${index}`}>Judul Reward</Label>
                            <Input
                              id={`reward-title-${index}`}
                              placeholder="Contoh: Early Bird, Supporter, dll."
                              value={reward.title}
                              onChange={(e) => handleRewardChange(index, "title", e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`reward-amount-${index}`}>Jumlah Donasi (Rp)</Label>
                            <Input
                              id={`reward-amount-${index}`}
                              type="number"
                              min="10000"
                              step="10000"
                              placeholder="Contoh: 100000"
                              value={reward.amount}
                              onChange={(e) => handleRewardChange(index, "amount", e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`reward-desc-${index}`}>Deskripsi Reward</Label>
                          <Textarea
                            id={`reward-desc-${index}`}
                            placeholder="Jelaskan apa yang akan didapatkan pendukung"
                            value={reward.description}
                            onChange={(e) => handleRewardChange(index, "description", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleAddReward}
                  >
                    <Plus className="h-4 w-4" />
                    Tambah Reward
                  </Button>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("media")}>
                      Sebelumnya
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Memproses..." : "Buat Proyek"}
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
            </Card>
          </Tabs>
        </form>
      </div>
    </div>
  )
}
