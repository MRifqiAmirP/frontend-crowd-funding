"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState("student")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Pendaftaran berhasil!",
        description: "Silakan cek email Anda untuk verifikasi akun.",
      })
      setIsLoading(false)
      router.push("/login")
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Daftar Akun</CardTitle>
            <CardDescription className="text-center">Buat akun untuk mulai menggunakan ProyekSiswa.id</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Jenis Akun</Label>
                <RadioGroup
                  defaultValue="student"
                  className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                  value={accountType}
                  onValueChange={setAccountType}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Pelajar/Mahasiswa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mentor" id="mentor" />
                    <Label htmlFor="mentor">Mentor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="donor" id="donor" />
                    <Label htmlFor="donor">Donatur</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Nama Depan</Label>
                  <Input id="first-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Nama Belakang</Label>
                  <Input id="last-name" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nama@email.com" required />
              </div>

              {accountType === "student" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="school">Sekolah/Kampus</Label>
                    <Input id="school" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education-level">Jenjang Pendidikan</Label>
                    <Select required>
                      <SelectTrigger id="education-level">
                        <SelectValue placeholder="Pilih jenjang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smp">SMP</SelectItem>
                        <SelectItem value="sma">SMA</SelectItem>
                        <SelectItem value="smk">SMK</SelectItem>
                        <SelectItem value="d3">D1</SelectItem>
                        <SelectItem value="d3">D2</SelectItem>
                        <SelectItem value="d3">D3</SelectItem>
                        <SelectItem value="s1">S1</SelectItem>
                        <SelectItem value="s2">S2</SelectItem>
                        <SelectItem value="s2">S3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {accountType === "mentor" && (
                <div className="space-y-2">
                  <Label htmlFor="expertise">Bidang Keahlian</Label>
                  <Select required>
                    <SelectTrigger id="expertise">
                      <SelectValue placeholder="Pilih bidang keahlian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teknologi">Teknologi</SelectItem>
                      <SelectItem value="bisnis">Bisnis & Kewirausahaan</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="desain">Desain & Kreatif</SelectItem>
                      <SelectItem value="pendidikan">Pendidikan</SelectItem>
                      <SelectItem value="lingkungan">Lingkungan</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                <Label htmlFor="terms" className="text-sm font-normal">
                  Saya menyetujui{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Syarat dan Ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Kebijakan Privasi
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Daftar"}
              </Button>
              <p className="mt-4 text-center text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Masuk
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
