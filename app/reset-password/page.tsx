// app/reset-password/page.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
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
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { resetPassword } from "@/lib/auth"; // Import fungsi resetPassword

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook untuk mengakses query parameters
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Ambil token dari URL saat komponen dimuat
  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
      setError(null); // Clear any initial error if token is found
    } else {
      setError(
        "Token reset password tidak ditemukan di URL. Silakan gunakan link yang valid dari email Anda."
      );
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "newPassword") {
      setNewPassword(value);
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!token) {
      setError("Token reset password tidak valid atau hilang.");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password baru harus memiliki setidaknya 8 karakter.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password baru dan konfirmasi password tidak cocok.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await resetPassword(token, newPassword);

      if (result.success) {
        toast({
          title: "Password Berhasil Direset!",
          description:
            result.message ||
            "Password Anda telah berhasil diubah. Silakan masuk dengan password baru Anda.",
        });
        router.push("/login"); // Redirect ke halaman login setelah sukses
      } else {
        setError(
          result.message || "Gagal mereset password. Silakan coba lagi."
        );
        toast({
          title: "Reset Password Gagal",
          description:
            result.message || "Terjadi kesalahan saat mereset password.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Error during password reset:", err);
      setError(
        err.message ||
          "Terjadi kesalahan jaringan atau server. Silakan coba lagi nanti."
      );
      toast({
        title: "Reset Password Gagal",
        description: err.message || "Terjadi kesalahan jaringan atau server.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Reset Password
            </CardTitle>
            <CardDescription className="text-center">
              Masukkan password baru Anda.
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

              {/* Tampilkan form hanya jika token ditemukan */}
              {token ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Password Baru</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Konfirmasi Password Baru
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Menunggu token reset password... Pastikan Anda mengakses
                    halaman ini dari link email yang valid.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              {token && ( // Tampilkan tombol hanya jika token ditemukan
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !token}
                >
                  {isLoading ? "Memproses..." : "Reset Password"}
                </Button>
              )}
              <p className="mt-4 text-center text-sm text-gray-600">
                Kembali ke{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
