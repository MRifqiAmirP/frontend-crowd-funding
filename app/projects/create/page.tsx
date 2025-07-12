"use client";

import type React from "react";
import { useState, useEffect } from "react"; // Import useEffect
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Upload, Info, Plus, Trash2, Loader2, AlertCircle } from "lucide-react"; // Added Loader2, AlertCircle
import { createProject } from "@/lib/project";
import { getCategories, Category } from "@/lib/category-api"; // Import the new API function and Category type
import { Alert, AlertDescription } from "@/components/ui/alert"; // Import Alert and AlertDescription

export default function CreateProjectPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("informasi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rewards, setRewards] = useState([
    { title: "", amount: "", description: "" },
  ]);

  const [formData, setFormData] = useState({
    projectName: "",
    category: "", // This will store the category ID or name
    school: "",
    target: "",
    duration: "",
    shortDescription: "",
    fullDescription: "",
    thumbnail: null as File | null,
    galleries: [] as File[],
    videoUrl: "",
  });

  const [categories, setCategories] = useState<Category[]>([]); // State to store fetched categories
  const [isLoadingCategories, setIsLoadingCategories] = useState(true); // Loading state for categories
  const [categoryError, setCategoryError] = useState<string | null>(null); // Error state for categories

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        setCategoryError(null);
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        // Optionally set a default category if available
        if (fetchedCategories.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category: fetchedCategories[0].category_name,
          }));
        }
      } catch (err: any) {
        setCategoryError(err.message || "Gagal memuat kategori.");
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this runs once on mount

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Files from input thumbnail:", e.target.files);
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, thumbnail: e.target.files![0] }));
      console.log("Thumbnail set in state:", e.target.files[0]);
    } else {
      setFormData((prev) => ({ ...prev, thumbnail: null }));
      console.log("No thumbnail file selected or invalid file.");
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Files from input galleries:", e.target.files);
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        galleries: Array.from(e.target.files!),
      }));
      console.log("Galleries set in state:", Array.from(e.target.files!));
    } else {
      setFormData((prev) => ({ ...prev, galleries: [] }));
      console.log("No gallery files selected.");
    }
  };

  const handleAddReward = () => {
    setRewards([...rewards, { title: "", amount: "", description: "" }]);
  };

  const handleRemoveReward = (index: number) => {
    const newRewards = [...rewards];
    newRewards.splice(index, 1);
    setRewards(newRewards);
  };

  const handleRewardChange = (index: number, field: string, value: string) => {
    const newRewards = [...rewards];
    newRewards[index] = { ...newRewards[index], [field]: value };
    setRewards(newRewards);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formApiData = new FormData();

    // Mengembalikan properti ke level teratas FormData seperti yang diharapkan backend
    formApiData.append("projectName", formData.projectName);
    formApiData.append("provider", formData.school); // Assuming provider is school
    formApiData.append("educationLevel", "Perguruan Tinggi"); // Sesuaikan jika dinamis
    formApiData.append("institutionName", formData.school);
    formApiData.append("shortDescription", formData.shortDescription);
    formApiData.append("fullDescription", formData.fullDescription);
    formApiData.append("aboutProject", formData.fullDescription); // Asumsi sama
    formApiData.append("target", formData.target); // Dikirim sebagai string, backend harus mem-parse

    // Menghitung deadline
    const today = new Date();
    const deadlineDate = new Date(
      today.setDate(today.getDate() + parseInt(formData.duration))
    );
    formApiData.append("deadline", deadlineDate.toISOString().split("T")[0]);

    formApiData.append("categoryNames", formData.category); // Use selected category name/ID

    // Menambahkan thumbnail (kembali ke format file terpisah)
    console.log("formData.thumbnail before append:", formData.thumbnail);
    if (formData.thumbnail) {
      formApiData.append(
        "thumbnail",
        formData.thumbnail,
        formData.thumbnail.name
      );
      console.log("Thumbnail appended:", formData.thumbnail.name);
    } else {
      console.log("No thumbnail file selected or available.");
    }

    // Menambahkan galeri (kembali ke format file terpisah)
    formData.galleries.forEach((file) => {
      formApiData.append("galleries", file, file.name);
    });
    formData.galleries.forEach((file) => {
      formApiData.append("galleryCaptions", file.name); // Asumsi caption sama
    });
    console.log(
      "Galleries appended:",
      formData.galleries.map((f) => f.name)
    );

    // --- REWARD HANDLING START ---
    // Iterate over the rewards state and append each reward's data
    rewards.forEach((reward, index) => {
      // Only append if the reward has a title and amount
      if (reward.title && reward.amount) {
        formApiData.append("supportPackagesName", reward.title);
        // Ensure amount is a number before appending, as it's stored as string in state
        formApiData.append("nominal", parseInt(reward.amount).toString());
        formApiData.append("benefit", reward.description);
      } else {
        console.warn(
          `Reward at index ${index} is incomplete and will not be sent.`
        );
      }
    });
    // --- REWARD HANDLING END ---

    // Menambahkan URL video jika ada
    if (formData.videoUrl) {
      formApiData.append("videoUrl", formData.videoUrl);
    }

    // Untuk debugging, lihat isi FormData
    for (let [key, value] of formApiData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await createProject(formApiData);
      console.log("Project creation response:", response);
      toast({
        title: "Proyek berhasil dibuat!",
        description: "Proyek Anda sedang dalam peninjauan oleh tim kami.",
        // @ts-ignore
        type: "success", // Ensure 'success' is a valid type for your toast component
      });
      router.back();
    } catch (error: any) {
      console.error(
        "An error occurred during project creation:",
        error.response?.data?.message || error.message
      );
      toast({
        title: "Gagal membuat proyek.",
        description: Array.isArray(error.response?.data?.message)
          ? error.response.data.message.join(", ")
          : error.message || "Terjadi kesalahan saat membuat proyek.",
        // @ts-ignore
        type: "error", // Ensure 'error' is a valid type for your toast component
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Buat Proyek Baru</h1>
        <p className="text-gray-600 mb-8">
          Isi formulir berikut untuk membuat kampanye crowdfunding untuk proyek
          kewirausahaanmu
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
                  <CardDescription>
                    Masukkan informasi dasar tentang proyekmu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Judul Proyek</Label>
                      <Input
                        id="projectName"
                        placeholder="Masukkan judul proyek yang menarik"
                        value={formData.projectName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Kategori</Label>
                        {isLoadingCategories ? (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Memuat kategori...</span>
                          </div>
                        ) : categoryError ? (
                          <Alert className="border-red-200 bg-red-50 text-red-800">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{categoryError}</AlertDescription>
                          </Alert>
                        ) : (
                          <Select
                            value={formData.category}
                            onValueChange={handleSelectChange}
                            required
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem
                                  key={cat.id}
                                  value={cat.category_name.toLowerCase()}
                                >
                                  {cat.category_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="school">Sekolah/Kampus</Label>
                        <Input
                          id="school"
                          placeholder="Nama sekolah atau kampus"
                          value={formData.school}
                          onChange={handleChange}
                          required
                        />
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
                          value={formData.target}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Durasi Kampanye (Hari)</Label>
                        <Input
                          id="duration"
                          type="number"
                          min="7"
                          max="60"
                          placeholder="Contoh: 30"
                          value={formData.duration}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shortDescription">
                        Deskripsi Singkat
                      </Label>
                      <Textarea
                        id="shortDescription"
                        placeholder="Jelaskan secara singkat tentang proyekmu (maksimal 200 karakter)"
                        maxLength={200}
                        value={formData.shortDescription}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("deskripsi")}
                    >
                      Selanjutnya
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="deskripsi">
                <CardHeader>
                  <CardTitle>Deskripsi Proyek</CardTitle>
                  <CardDescription>
                    Jelaskan secara detail tentang proyekmu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullDescription">Deskripsi Lengkap</Label>
                    <Textarea
                      id="fullDescription"
                      placeholder="Jelaskan secara detail tentang proyekmu, termasuk latar belakang, tujuan, dan rencana penggunaan dana"
                      className="min-h-[300px]"
                      value={formData.fullDescription}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("informasi")}
                    >
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
                  <CardDescription>
                    Unggah gambar atau video untuk proyekmu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="thumbnail" className="mb-2 block">
                        Gambar Utama
                      </Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500 mb-2">
                          Klik atau seret file ke sini
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, atau GIF (maks. 5MB)
                        </p>
                        <Input
                          id="thumbnail"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() =>
                            document.getElementById("thumbnail")?.click()
                          }
                        >
                          Pilih File
                        </Button>
                        {formData.thumbnail && (
                          <p className="text-sm text-gray-500 mt-2">
                            {formData.thumbnail.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="galleries" className="mb-2 block">
                        Galeri Proyek (Opsional)
                      </Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500 mb-2">
                          Unggah hingga 5 gambar tambahan
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, atau GIF (maks. 5MB per file)
                        </p>
                        <Input
                          id="galleries"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() =>
                            document.getElementById("galleries")?.click()
                          }
                        >
                          Pilih File
                        </Button>
                        {formData.galleries.length > 0 && (
                          <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                            {formData.galleries.map((file, index) => (
                              <li key={index}>{file.name}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="videoUrl" className="mb-2 block">
                        Video Proyek (Opsional)
                      </Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500 mb-2">
                          Unggah video atau masukkan URL YouTube/Vimeo
                        </p>
                        <p className="text-xs text-gray-400">
                          MP4, MOV (maks. 50MB) atau URL
                        </p>
                        <div className="flex gap-2 mt-4 justify-center">
                          <Input
                            id="videoUrl"
                            placeholder="Atau masukkan URL video"
                            className="max-w-xs"
                            value={formData.videoUrl}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("deskripsi")}
                    >
                      Sebelumnya
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setActiveTab("rewards")}
                    >
                      Selanjutnya
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="rewards">
                <CardHeader>
                  <CardTitle>Rewards</CardTitle>
                  <CardDescription>
                    Tentukan rewards untuk pendukung proyekmu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="h-4 w-4 text-blue-500" />
                    <p className="text-sm text-gray-600">
                      Rewards yang menarik dapat meningkatkan jumlah pendukung
                      proyekmu
                    </p>
                  </div>

                  {rewards.map((reward, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Reward #{index + 1}</h3>
                        {rewards.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveReward(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`reward-title-${index}`}>
                              Judul Reward
                            </Label>
                            <Input
                              id={`reward-title-${index}`}
                              placeholder="Contoh: Early Bird, Supporter, dll."
                              value={reward.title}
                              onChange={(e) =>
                                handleRewardChange(
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`reward-amount-${index}`}>
                              Jumlah Donasi (Rp)
                            </Label>
                            <Input
                              id={`reward-amount-${index}`}
                              type="number"
                              min="10000"
                              step="10000"
                              placeholder="Contoh: 100000"
                              value={reward.amount}
                              onChange={(e) =>
                                handleRewardChange(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`reward-desc-${index}`}>
                            Deskripsi Reward
                          </Label>
                          <Textarea
                            id={`reward-desc-${index}`}
                            placeholder="Jelaskan apa yang akan didapatkan pendukung"
                            value={reward.description}
                            onChange={(e) =>
                              handleRewardChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
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
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("media")}
                    >
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
  );
}
