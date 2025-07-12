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
import { formatCurrency, calculatePlatformFee } from "@/lib/midtrans";
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
  LogIn,
} from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { sendFundingRequest } from "@/lib/funding-api";
import { getProjectDetails, ProjectDetails } from "@/lib/project-details-api"; // Import the new API function and ProjectDetails type

interface Reward {
  id: string;
  amount: number;
  title: string;
  description: string;
  estimatedDelivery?: string;
  limited?: boolean;
  remaining?: number;
  available?: boolean; // Added for consistency with previous dummy data structure
}

interface DonationFormProps {
  projectId: string;
  projectTitle: string; // This prop will still be used for initial display
  // The 'rewards' prop will now be internally managed by fetching from the API
  // rewards?: Array<Reward>; // Removed as rewards will be fetched internally
  onPaymentSuccess?: (data: any) => void; // Optional callback for payment success
}

export default function DonationFormEnhanced({
  projectId,
  projectTitle,
  onPaymentSuccess,
}: DonationFormProps) {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [isLoadingProjectDetails, setIsLoadingProjectDetails] = useState(true);
  const [projectDetailsError, setProjectDetailsError] = useState<string | null>(
    null
  );

  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedRewardId, setSelectedRewardId] = useState<string | null>(null); // Renamed to selectedRewardId for clarity
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

  // Calculate platform fee and total amount based on selectedAmount
  const platformFee = calculatePlatformFee(selectedAmount);
  const totalAmount = selectedAmount + platformFee;

  // Effect to fetch project details including rewards
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoadingProjectDetails(true);
        setProjectDetailsError(null);
        const details = await getProjectDetails(projectId);
        setProjectDetails(details);
      } catch (err: any) {
        setProjectDetailsError(err.message || "Gagal memuat detail proyek.");
        console.error("Failed to fetch project details:", err);
      } finally {
        setIsLoadingProjectDetails(false);
      }
    };

    if (projectId) {
      fetchDetails();
    }
  }, [projectId]); // Re-fetch if projectId changes

  // Effect to update selectedReward if selectedAmount matches a reward
  useEffect(() => {
    if (projectDetails?.rewards) {
      const matchingReward = projectDetails.rewards.find(
        (reward) => reward.amount === selectedAmount
      );

      if (matchingReward) {
        if (selectedRewardId !== matchingReward.id) {
          setSelectedRewardId(matchingReward.id);
        }
      } else {
        if (selectedRewardId !== null) {
          setSelectedRewardId(null);
        }
      }
    }
  }, [selectedAmount, projectDetails?.rewards, selectedRewardId]);

  // Effect to populate donor info from logged-in user
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

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const payload = {
        supportPackageId: selectedRewardId, // Use selectedRewardId here
        projectId: projectId,
        amount: selectedAmount,
        isAnonymous: donorInfo.anonymous,
        firstName: donorInfo.anonymous ? "anonymous" : donorInfo.firstName,
        lastName: donorInfo.anonymous ? "" : donorInfo.lastName,
        email: donorInfo.anonymous ? "anonymous@example.com" : donorInfo.email,
        message: donorInfo.anonymous ? "" : donorInfo.message,
      };

      const result = await sendFundingRequest(payload);

      if (!result.success && !result.data) {
        throw new Error(result.message || "Gagal mengirim permintaan donasi.");
      }
      console.log("Funding request successful:", result);
      setSuccess("Donasi Anda berhasil! Terima kasih atas dukungan Anda.");
      onPaymentSuccess?.(result);
      if (result.data?.redirectUrl) {
        router.push(result.data.redirectUrl);
      } else {
        throw new Error("Redirect URL tidak ditemukan.");
      }
    } catch (error) {
      console.error("Funding request error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim donasi. Silakan coba lagi."
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
    setSelectedRewardId(rewardId); // Set the ID of the selected reward
    setSelectedAmount(amount); // Set the amount based on the reward
    setCustomAmount(amount.toString()); // Update custom amount input
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
  if (isAuthLoading || isLoadingProjectDetails) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <span className="ml-3 text-lg text-gray-600">
          Memuat data {isLoadingProjectDetails ? "proyek" : "pengguna"}...
        </span>
      </div>
    );
  }

  if (projectDetailsError) {
    return (
      <div className="max-w-md mx-auto p-6 flex flex-col items-center justify-center min-h-[400px]">
        <Alert className="mb-6 text-center border-red-200 bg-red-50">
          <AlertCircle className="h-6 w-6 mx-auto text-red-600 mb-2" />
          <AlertDescription className="text-red-800 text-base font-medium">
            {projectDetailsError}
          </AlertDescription>
          <p className="text-sm text-gray-700 mt-2">
            Silakan coba muat ulang halaman.
          </p>
        </Alert>
      </div>
    );
  }

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

  // If projectDetails is null after loading, it means project was not found
  if (!projectDetails) {
    return (
      <div className="max-w-md mx-auto p-6 flex flex-col items-center justify-center min-h-[400px]">
        <Alert className="mb-6 text-center border-red-200 bg-red-50">
          <AlertCircle className="h-6 w-6 mx-auto text-red-600 mb-2" />
          <AlertDescription className="text-red-800 text-base font-medium">
            Proyek tidak ditemukan.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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
            {projectDetails.rewards.length > 0 && (
              <div>
                <Label className="text-base font-medium mb-3 block flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Pilih Reward (Opsional)
                </Label>
                <div className="space-y-3">
                  {projectDetails.rewards.map((reward) => (
                    <div
                      key={reward.id}
                      className={`flex items-center space-x-2 p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedRewardId === reward.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      } ${
                        !reward.available ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() =>
                        reward.available &&
                        handleRewardSelect(reward.id, reward.amount)
                      }
                    >
                      {/* Use RadioGroupItem if you want true radio button behavior */}
                      {/* For simplicity, I'm keeping the div as clickable, but a RadioGroup would be more semantically correct */}
                      <div>
                        <h4 className="font-medium">{reward.title}</h4>
                        <p className="text-sm text-gray-600">
                          {reward.description}
                        </p>
                        {reward.estimatedDelivery && (
                          <p className="text-xs text-gray-500">
                            Estimasi Pengiriman: {reward.estimatedDelivery}
                          </p>
                        )}
                        {reward.limited && reward.remaining && (
                          <p className="text-xs text-orange-600 mt-1">
                            Tersisa {reward.remaining} item
                          </p>
                        )}
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        {formatCurrency(reward.amount)}
                      </Badge>
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

            {/* If your backend API does not use 'phone', you might remove or comment this out */}
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
                    // Clear personal info if anonymous is checked
                    setDonorInfo((prev) => ({
                      ...prev,
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "", // Keep phone field in state to clear it
                      message: "",
                    }));
                  } else {
                    // Restore user info if un-checked and user is logged in
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
                  <span>Donasi untuk: {projectDetails.title}</span>
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
                Perilaku setelah pembayaran mungkin bergantung pada respons dari
                backend Anda.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
