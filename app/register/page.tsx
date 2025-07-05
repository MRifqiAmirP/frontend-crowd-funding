// app/register/page.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react"; // Import useEffect
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { registerUser } from "@/lib/auth"; // Import fungsi registerUser
import { RegisterResponse, ErrorResponse } from "@/types/auth"; // Import tipe respons

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<
    "student" | "mentor" | "donor"
  >("student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    school: "", // For student (maps to 'instance' in payload)
    educationLevel: "", // For student
    expertise: "", // For mentor
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State baru untuk tombol

  // useEffect untuk memantau perubahan formData dan accountType
  useEffect(() => {
    const validateForm = () => {
      // Validasi field umum
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        return false;
      }

      // Validasi password cocok
      if (formData.password !== formData.confirmPassword) {
        return false;
      }

      // Validasi berdasarkan jenis akun
      if (accountType === "student") {
        if (!formData.school || !formData.educationLevel) {
          return false;
        }
      } else if (accountType === "mentor") {
        if (!formData.expertise) {
          return false;
        }
      }
      // Untuk "donor", tidak ada field tambahan yang wajib di form ini

      // Validasi Terms & Conditions
      if (!formData.termsAccepted) {
        return false;
      }

      return true;
    };

    setIsButtonDisabled(!validateForm());
  }, [formData, accountType]); // Dependensi: setiap kali formData atau accountType berubah

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    setError(null); // Clear error when input changes
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validasi tambahan sebelum kirim (redundant tapi aman)
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      setIsLoading(false);
      return;
    }

    if (!formData.termsAccepted) {
      setError(
        "Anda harus menyetujui Syarat dan Ketentuan serta Kebijakan Privasi."
      );
      setIsLoading(false);
      return;
    }

    // Pastikan tombol tidak disabled (validasi di useEffect seharusnya sudah cukup)
    if (isButtonDisabled) {
      toast({
        title: "Data Tidak Lengkap",
        description:
          "Mohon lengkapi semua bidang wajib dan setujui Syarat & Ketentuan.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    // Prepare data based on account type
    const payload: any = {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      password: formData.password,
      role: accountType, // Role diambil dari accountType
    };

    if (accountType === "student") {
      payload.instance = formData.school; // Menggunakan 'instance' untuk sekolah/kampus
      payload.education_level = formData.educationLevel;
    } else if (accountType === "mentor") {
      payload.expertise = formData.expertise;
    }
    // Jika donor, payload sudah cukup (hanya email, nama, password, role)

    try {
      const response = await registerUser(payload);

      if (response.success) {
        // Pendaftaran berhasil
        toast({
          title: "Pendaftaran berhasil!",
          description: "Silakan cek email Anda untuk verifikasi akun.",
        });
        router.push("/login");
      } else {
        // Pendaftaran gagal, tampilkan pesan error dari backend
        const errorResponse = response as ErrorResponse;
        setError(
          errorResponse.message || "Pendaftaran gagal. Silakan coba lagi."
        );
        if (errorResponse.errors && errorResponse.errors.length > 0) {
          errorResponse.errors.forEach((err) =>
            toast({
              title: "Validasi Gagal",
              description: err,
              type: "error",
            })
          );
        }
      }
    } catch (err) {
      console.error("Terjadi kesalahan saat mendaftar:", err);
      setError(
        "Terjadi kesalahan jaringan atau server. Silakan coba lagi nanti."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Daftar Akun
            </CardTitle>
            <CardDescription className="text-center">
              Buat akun untuk mulai menggunakan ProyekSiswa.id
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label>Jenis Akun</Label>
                <RadioGroup
                  defaultValue="student"
                  className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                  value={accountType}
                  onValueChange={(value: "student" | "mentor" | "donor") => {
                    setAccountType(value);
                    // Reset fields not relevant to the new account type
                    setFormData((prev) => ({
                      ...prev,
                      school: "",
                      educationLevel: "",
                      expertise: "",
                    }));
                    setError(null);
                  }}
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
                  <Label htmlFor="firstName">Nama Depan</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required // Ditandai required untuk validasi HTML5
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nama Belakang</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required // Ditandai required untuk validasi HTML5
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required // Ditandai required untuk validasi HTML5
                />
              </div>

              {accountType === "student" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="school">Sekolah/Kampus</Label>
                    <Input
                      id="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      required={accountType === "student"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="educationLevel">Jenjang Pendidikan</Label>
                    <Select
                      value={formData.educationLevel}
                      onValueChange={(val) =>
                        handleSelectChange("educationLevel", val)
                      }
                      required={accountType === "student"}
                    >
                      <SelectTrigger id="educationLevel">
                        <SelectValue placeholder="Pilih jenjang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SMP">SMP</SelectItem>
                        <SelectItem value="SMA">SMA</SelectItem>
                        <SelectItem value="SMK">SMK</SelectItem>
                        <SelectItem value="D1">D1</SelectItem>
                        <SelectItem value="D2">D2</SelectItem>
                        <SelectItem value="D3">D3</SelectItem>
                        <SelectItem value="S1">S1</SelectItem>
                        <SelectItem value="S2">S2</SelectItem>
                        <SelectItem value="S3">S3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {accountType === "mentor" && (
                <div className="space-y-2">
                  <Label htmlFor="expertise">Bidang Keahlian</Label>
                  <Select
                    value={formData.expertise}
                    onValueChange={(val) =>
                      handleSelectChange("expertise", val)
                    }
                    required={accountType === "mentor"}
                  >
                    <SelectTrigger id="expertise">
                      <SelectValue placeholder="Pilih bidang keahlian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teknologi">Teknologi</SelectItem>
                      <SelectItem value="bisnis">
                        Bisnis & Kewirausahaan
                      </SelectItem>
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
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required // Ditandai required untuk validasi HTML5
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required // Ditandai required untuk validasi HTML5
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  className="rounded border-gray-300"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  required // Ditandai required untuk validasi HTML5
                />
                <Label htmlFor="termsAccepted" className="text-sm font-normal">
                  Saya menyetujui{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Syarat dan Ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    Kebijakan Privasi
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || isButtonDisabled}
              >
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
  );
}
