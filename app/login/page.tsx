"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { authenticateUser } from "@/lib/auth"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const user = await authenticateUser(formData.email, formData.password)

      if (user) {
        login(user)
        toast({
          title: "Login berhasil!",
          description: `Selamat datang, ${user.name}`,
        })

        // Redirect based on role
        switch (user.role) {
          case "student":
            router.push("/dashboard/student")
            break
          case "mentor":
            router.push("/dashboard/mentor")
            break
          case "donor":
            router.push("/dashboard/donor")
            break
          default:
            router.push("/dashboard")
        }
      } else {
        setError("Email atau password salah")
      }
    } catch (error) {
      setError("Terjadi kesalahan saat login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (error) setError("")
  }

  const demoAccounts = [
    { role: "Pelajar/Mahasiswa", email: "pelajar@gmail.com", password: "pelajar1234" },
    { role: "Mentor", email: "mentor@gmail.com", password: "mentor1234" },
    { role: "Donatur", email: "donatur@gmail.com", password: "donatur1234" },
  ]

  const fillDemoAccount = (email: string, password: string) => {
    setFormData({ email, password })
    setError("")
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="flex justify-center">
        <div className="w-full max-w-md space-y-6">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Masuk</CardTitle>
              <CardDescription className="text-center">
                Masukkan email dan password untuk mengakses akunmu
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Lupa password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Memproses..." : "Masuk"}
                </Button>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <Link href="/register" className="text-blue-600 hover:underline">
                    Daftar sekarang
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          {/* Demo Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Akun Demo</CardTitle>
              <CardDescription>Klik untuk mengisi form dengan akun demo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoAccounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{account.role}</p>
                    <p className="text-xs text-gray-600">{account.email}</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoAccount(account.email, account.password)}
                  >
                    Gunakan
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
