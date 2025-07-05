"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  formatCurrency,
  calculatePlatformFee,
  MIDTRANS_CONFIG,
} from "@/lib/midtrans";
import {
  Heart,
  Gift,
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  AlertCircle,
  CheckCircle,
  LogIn, // Import icon login
} from "lucide-react";

import { useAuth } from "@/contexts/auth-context";

interface DonationFormProps {
  projectId: string;
  projectTitle: string;
  rewards?: Array<{
    id: string;
    amount: number;
    title: string;
    description: string;
    estimatedDelivery?: string;
    limited?: boolean;
    remaining?: number;
  }>;
}

export default function DonationFormEnhanced({
  projectId,
  projectTitle,
  rewards = [],
}: DonationFormProps) {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    anonymous: false,
  });

  const [isFirstNameDisabled, setIsFirstNameDisabled] = useState(false);
  const [isLastNameDisabled, setIsLastNameDisabled] = useState(false);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);

  const predefinedAmounts = [25000, 50000, 100000, 250000, 500000, 1000000];

  const platformFee = calculatePlatformFee(selectedAmount);
  const totalAmount = selectedAmount + platformFee;

  useEffect(() => {
    const matchingReward = rewards.find(
      (reward) => reward.amount === selectedAmount
    );

    if (matchingReward) {
      if (selectedReward !== matchingReward.id) {
        setSelectedReward(matchingReward.id);
      }
    } else {
      if (selectedReward !== null) {
        setSelectedReward(null);
      }
    }
  }, [selectedAmount, rewards, selectedReward]);

  useEffect(() => {
    if (!isAuthLoading && user) {
      setDonorInfo((prevInfo) => ({
        ...prevInfo,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
      }));
      setIsFirstNameDisabled(!!user.name);
      setIsLastNameDisabled(!!user.name && user.name.split(" ").length > 1);
      setIsEmailDisabled(!!user.email);
    } else if (!isAuthLoading && !user) {
      setIsFirstNameDisabled(false);
      setIsLastNameDisabled(false);
      setIsEmailDisabled(false);
      setDonorInfo((prevInfo) => ({
        ...prevInfo,
        firstName: "",
        lastName: "",
        email: "",
      }));
    }
  }, [user, isAuthLoading]);

  const loadSnapScript = () => {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById("midtrans-snap");
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.id = "midtrans-snap";
      script.src = MIDTRANS_CONFIG.snapUrl;
      // script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY); // Pastikan ini sudah didefinisikan atau diimpor
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await loadSnapScript();

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          amount: selectedAmount,
          customerDetails: donorInfo,
          rewardId: selectedReward,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment");
      }

      if (!data.token) {
        throw new Error("No payment token received");
      }

      // @ts-ignore
      window.snap.pay(data.token, {
        onSuccess: (result: any) => {
          console.log("Payment success:", result);
          setSuccess("Pembayaran berhasil! Terima kasih atas donasi Anda.");
          router.push(`/payment/success?order_id=${data.orderId}`);
        },
        onPending: (result: any) => {
          console.log("Payment pending:", result);
          router.push(`/payment/pending?order_id=${data.orderId}`);
        },
        onError: (result: any) => {
          console.log("Payment error:", result);
          setError("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          console.log("Payment popup closed");
          setError("Pembayaran dibatalkan.");
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat memproses pembayaran"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    const rawValue = value.replace(/\D/g, "");
    setCustomAmount(rawValue);
    const numValue = Number.parseInt(rawValue);
    if (!isNaN(numValue)) {
      setSelectedAmount(numValue);
    } else {
      setSelectedAmount(0);
    }
  };

  const handleRewardSelect = (rewardId: string, amount: number) => {
    setSelectedReward(rewardId);
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleAmountNext = () => {
    if (selectedAmount < 10000) {
      setError("Minimum donasi adalah Rp 10.000");
      return;
    }
    setError(null);
    setCurrentStep(2);
  };

  const handleInfoNext = async () => {
    if (!donorInfo.anonymous && (!donorInfo.firstName || !donorInfo.email)) {
      setError("Nama dan email wajib diisi jika tidak anonim.");
      return;
    }

    if (
      !donorInfo.anonymous &&
      donorInfo.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email)
    ) {
      setError("Format email tidak valid.");
      return;
    }

    setError(null);
    await handlePayment();
  };

  // --- START NEW LOGIC FOR LOGIN REQUIREMENT ---
  // Tampilkan loading state jika AuthProvider masih memuat user
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <span className="ml-3 text-lg text-gray-600">
          Memuat data pengguna...
        </span>
      </div>
    );
  }

  // Tampilkan pesan dan tombol login jika user belum login
  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 flex flex-col items-center justify-center min-h-[400px]">
        <Alert className="mb-6 text-center border-orange-200 bg-orange-50">
          <AlertCircle className="h-6 w-6 mx-auto text-orange-600 mb-2" />
          <AlertDescription className="text-orange-800 text-base font-medium">
            Anda harus login untuk melanjutkan donasi.
          </AlertDescription>
          <p className="text-sm text-gray-700 mt-2">
            Silakan login untuk mengisi data donatur Anda secara otomatis dan
            mempermudah proses.
          </p>
        </Alert>
        <Button
          onClick={() => router.push("/login")}
          className="mt-4 px-6 py-3 text-lg"
        >
          <LogIn className="mr-2 h-5 w-5" />
          Login Sekarang
        </Button>
      </div>
    );
  }
  // --- END NEW LOGIC FOR LOGIN REQUIREMENT ---

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <div
            className={`w-16 h-1 ${
              currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
            }`}
          />
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mb-8 text-sm text-gray-600">
        <span className={currentStep >= 1 ? "text-blue-600 font-medium" : ""}>
          Pilih Jumlah
        </span>
        <span className={currentStep >= 2 ? "text-blue-600 font-medium" : ""}>
          Data Donatur
        </span>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {/* Step 1: Amount Selection */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Pilih Jumlah Donasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Predefined Amounts */}
            <div>
              <Label className="text-base font-medium mb-3 block">
                Jumlah Donasi
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => handleAmountSelect(amount)}
                    className="h-12"
                  >
                    {formatCurrency(amount)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <Label
                htmlFor="custom-amount"
                className="text-base font-medium mb-2 block"
              >
                Atau Masukkan Jumlah Lain
              </Label>
              <Input
                id="custom-amount"
                type="text"
                placeholder="Masukkan jumlah (min. Rp 10.000)"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Rewards */}
            {rewards.length > 0 && (
              <div>
                <Label className="text-base font-medium mb-3 block flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Pilih Reward (Opsional)
                </Label>
                <div className="space-y-3">
                  {rewards.map((reward) => (
                    <div
                      key={reward.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedReward === reward.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() =>
                        handleRewardSelect(reward.id, reward.amount)
                      }
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{reward.title}</h4>
                        <Badge variant="secondary">
                          {formatCurrency(reward.amount)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {reward.description}
                      </p>
                      {reward.estimatedDelivery && (
                        <p className="text-xs text-gray-500">
                          Estimasi pengiriman: {reward.estimatedDelivery}
                        </p>
                      )}
                      {reward.limited && reward.remaining && (
                        <p className="text-xs text-orange-600 mt-1">
                          Tersisa {reward.remaining} item
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amount Summary */}
            {selectedAmount > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Donasi</span>
                    <span>{formatCurrency(selectedAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Biaya Platform (3% + Rp 2.500)</span>
                    <span>{formatCurrency(platformFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleAmountNext}
              className="w-full"
              disabled={selectedAmount < 10000}
            >
              Lanjutkan
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Donor Information */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Data Donatur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user && (
              <Alert className="mb-4 border-blue-200 bg-blue-50 text-blue-800">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  Anda login sebagai{" "}
                  <strong>
                    {user.name} ({user.email})
                  </strong>
                  . Data Anda telah diisi otomatis.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Nama Depan *</Label>
                <Input
                  id="firstName"
                  value={donorInfo.firstName}
                  onChange={(e) =>
                    setDonorInfo({ ...donorInfo, firstName: e.target.value })
                  }
                  placeholder="Masukkan nama depan"
                  disabled={isFirstNameDisabled || donorInfo.anonymous}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nama Belakang</Label>
                <Input
                  id="lastName"
                  value={donorInfo.lastName}
                  onChange={(e) =>
                    setDonorInfo({ ...donorInfo, lastName: e.target.value })
                  }
                  placeholder="Masukkan nama belakang"
                  disabled={isLastNameDisabled || donorInfo.anonymous}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={donorInfo.email}
                onChange={(e) =>
                  setDonorInfo({ ...donorInfo, email: e.target.value })
                }
                placeholder="nama@email.com"
                disabled={isEmailDisabled || donorInfo.anonymous}
              />
            </div>

            {/* <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Nomor Telepon
              </Label>
              <Input
                id="phone"
                type="tel"
                value={donorInfo.phone}
                onChange={(e) =>
                  setDonorInfo({ ...donorInfo, phone: e.target.value })
                }
                placeholder="08xxxxxxxxxx"
                disabled={donorInfo.anonymous}
              />
            </div> */}

            <div>
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Pesan untuk Kreator (Opsional)
              </Label>
              <Textarea
                id="message"
                value={donorInfo.message}
                onChange={(e) =>
                  setDonorInfo({ ...donorInfo, message: e.target.value })
                }
                placeholder="Tulis pesan dukungan Anda..."
                rows={3}
                disabled={donorInfo.anonymous}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={donorInfo.anonymous}
                onCheckedChange={(checked) => {
                  setDonorInfo((prev) => ({
                    ...prev,
                    anonymous: checked as boolean,
                  }));
                  if (checked) {
                    setDonorInfo((prev) => ({
                      ...prev,
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      message: "",
                    }));
                  } else {
                    if (user) {
                      setDonorInfo((prev) => ({
                        ...prev,
                        firstName: user.name?.split(" ")[0] || "",
                        lastName:
                          user.name?.split(" ").slice(1).join(" ") || "",
                        email: user.email || "",
                      }));
                    }
                  }
                }}
              />
              <Label htmlFor="anonymous" className="text-sm">
                Donasi sebagai anonim
              </Label>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Ringkasan Pembayaran</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Donasi untuk: {projectTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jumlah donasi</span>
                  <span>{formatCurrency(selectedAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Biaya platform</span>
                  <span>{formatCurrency(platformFee)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total pembayaran</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="flex-1"
              >
                Kembali
              </Button>
              <Button
                onClick={handleInfoNext}
                disabled={
                  isLoading ||
                  (!donorInfo.anonymous &&
                    (!donorInfo.firstName || !donorInfo.email))
                }
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  `Bayar ${formatCurrency(totalAmount)}`
                )}
              </Button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Mode Sandbox:</strong> Ini adalah lingkungan testing.
                Gunakan data test yang tersedia di Snap popup untuk simulasi
                pembayaran.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
