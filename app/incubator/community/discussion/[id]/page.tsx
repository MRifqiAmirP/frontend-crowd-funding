"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  MessageCircle,
  ThumbsUp,
  Bookmark,
  Share2,
  Star,
  Clock,
  Eye,
  Send,
  MoreHorizontal,
  Flag,
  Edit,
  Trash2,
  Heart,
  Users,
  Download,
  MessageSquare,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { toast } from "sonner"
import IncubatorNav from "@/components/incubator-nav"

// Mock data untuk diskusi detail
const getDiscussionDetail = (id: string) => {
  const discussions = {
    "1": {
      id: "1",
      title: "Bagaimana mengoptimalkan algoritma machine learning untuk dataset kecil?",
      content: `
        <p>Halo teman-teman peneliti! 👋</p>
        
        <p>Saya sedang mengerjakan proyek AI untuk deteksi penyakit tanaman menggunakan computer vision. Tantangan utama yang saya hadapi adalah <strong>dataset yang sangat terbatas</strong> - hanya sekitar 500 gambar untuk 10 jenis penyakit yang berbeda.</p>
        
        <h3>🔍 Detail Masalah:</h3>
        <ul>
          <li>Dataset: 500 gambar (50 per kategori penyakit)</li>
          <li>Model: CNN dengan arsitektur ResNet-50</li>
          <li>Akurasi saat ini: 65% (target: >85%)</li>
          <li>Overfitting sangat tinggi pada validation set</li>
        </ul>
        
        <h3>💡 Yang Sudah Dicoba:</h3>
        <ol>
          <li><strong>Data Augmentation</strong> - Rotation, flip, zoom, brightness adjustment</li>
          <li><strong>Transfer Learning</strong> - Pre-trained ImageNet weights</li>
          <li><strong>Dropout & Regularization</strong> - L2 regularization dengan berbagai nilai</li>
          <li><strong>Cross-validation</strong> - K-fold untuk evaluasi yang lebih robust</li>
        </ol>
        
        <p>Hasil masih belum memuaskan. Ada yang punya pengalaman dengan teknik lain? Mungkin:</p>
        <ul>
          <li>🔄 <strong>Advanced augmentation</strong> (Mixup, CutMix, AutoAugment)</li>
          <li>🎯 <strong>Few-shot learning</strong> approaches</li>
          <li>🔗 <strong>Ensemble methods</strong></li>
          <li>📊 <strong>Synthetic data generation</strong></li>
        </ul>
        
        <p>Sangat appreciate input dari teman-teman! 🙏</p>
      `,
      author: {
        name: "Dr. Sarah Wijaya",
        username: "sarah_wijaya",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
        role: "AI Researcher",
        institution: "Institut Teknologi Bandung",
        reputation: 2450,
        badge: "Expert",
        verified: true,
        joinDate: "2022-03-15",
        totalPosts: 156,
        totalLikes: 1240,
        bio: "PhD in Computer Vision & Machine Learning. Passionate about applying AI for social good, especially in agriculture and healthcare.",
        expertise: ["Computer Vision", "Deep Learning", "Agricultural AI"],
        socialLinks: {
          linkedin: "https://linkedin.com/in/sarah-wijaya",
          twitter: "https://twitter.com/sarah_wijaya",
          github: "https://github.com/sarah-wijaya",
        },
      },
      category: "Artificial Intelligence",
      stats: {
        likes: 24,
        replies: 12,
        views: 156,
        bookmarks: 8,
        shares: 3,
      },
      tags: ["machine-learning", "dataset", "ai", "computer-vision", "agriculture"],
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      isHot: true,
      isPinned: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
          caption: "Contoh dataset gambar daun yang terinfeksi penyakit",
        },
        {
          url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop",
          caption: "Visualisasi hasil prediksi model CNN",
        },
      ],
      attachments: [
        {
          name: "dataset_sample.zip",
          size: "2.3 MB",
          type: "zip",
          url: "#",
        },
        {
          name: "model_architecture.pdf",
          size: "1.1 MB",
          type: "pdf",
          url: "#",
        },
      ],
      isLiked: false,
      isBookmarked: false,
    },
    "2": {
      id: "2",
      title: "Mencari kolaborator untuk riset renewable energy di Indonesia",
      content: `
        <p>Selamat pagi rekan-rekan peneliti! ☀️</p>
        
        <p>Tim kami di <strong>Green Energy Lab ITB</strong> sedang mengembangkan teknologi solar panel dengan efisiensi tinggi khusus untuk iklim tropis Indonesia. Kami mencari kolaborator yang berpengalaman dalam:</p>
        
        <h3>🔬 Area Expertise yang Dibutuhkan:</h3>
        <ul>
          <li><strong>Material Science</strong> - Pengembangan material photovoltaic baru</li>
          <li><strong>Electrical Engineering</strong> - Optimasi sistem inverter dan storage</li>
          <li><strong>Environmental Engineering</strong> - Analisis dampak lingkungan</li>
          <li><strong>Economics/Business</strong> - Analisis kelayakan komersial</li>
        </ul>
        
        <h3>📊 Progress Saat Ini:</h3>
        <ul>
          <li>✅ Prototype panel dengan efisiensi 22% (target: 25%)</li>
          <li>✅ Testing di 3 lokasi berbeda (Jakarta, Surabaya, Medan)</li>
          <li>🔄 Optimasi untuk kondisi kelembaban tinggi</li>
          <li>🔄 Pengembangan sistem monitoring IoT</li>
        </ul>
        
        <h3>💰 Funding & Resources:</h3>
        <p>Proyek ini didukung oleh:</p>
        <ul>
          <li>🏛️ Kementerian ESDM - Grant Rp 2.5 miliar</li>
          <li>🏢 Partnership dengan PT. Len Industri</li>
          <li>🔬 Akses ke lab material science ITB</li>
          <li>📍 Test site di 5 provinsi</li>
        </ul>
        
        <h3>🎯 Target & Timeline:</h3>
        <ul>
          <li><strong>Q2 2024:</strong> Prototype final dengan efisiensi 25%</li>
          <li><strong>Q3 2024:</strong> Pilot project 100 unit</li>
          <li><strong>Q4 2024:</strong> Commercialization roadmap</li>
          <li><strong>2025:</strong> Mass production planning</li>
        </ul>
        
        <p>Ini adalah kesempatan luar biasa untuk berkontribusi pada transisi energi Indonesia! 🇮🇩</p>
        
        <p>Yang tertarik, silakan DM atau email ke: <strong>ahmad.fauzi@itb.ac.id</strong></p>
      `,
      author: {
        name: "Prof. Ahmad Fauzi",
        username: "ahmad_fauzi",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
        role: "Energy Researcher",
        institution: "Institut Teknologi Bandung",
        reputation: 3200,
        badge: "Mentor",
        verified: true,
        joinDate: "2021-08-20",
        totalPosts: 89,
        totalLikes: 2100,
        bio: "Professor of Renewable Energy Engineering. Leading research in solar technology and energy storage systems for tropical climates.",
        expertise: ["Solar Energy", "Energy Storage", "Grid Integration"],
        socialLinks: {
          linkedin: "https://linkedin.com/in/ahmad-fauzi",
          researchgate: "https://researchgate.net/profile/Ahmad-Fauzi",
        },
      },
      category: "Renewable Energy",
      stats: {
        likes: 18,
        replies: 8,
        views: 89,
        bookmarks: 15,
        shares: 5,
      },
      tags: ["solar-energy", "collaboration", "materials", "indonesia", "renewable"],
      createdAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-14T14:20:00Z",
      isHot: false,
      isPinned: true,
      images: [
        {
          url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
          caption: "Solar panel testing facility di ITB",
        },
        {
          url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
          caption: "Grafik efisiensi panel di berbagai kondisi cuaca",
        },
      ],
      attachments: [
        {
          name: "project_proposal.pdf",
          size: "3.2 MB",
          type: "pdf",
          url: "#",
        },
        {
          name: "efficiency_data.xlsx",
          size: "890 KB",
          type: "excel",
          url: "#",
        },
      ],
      isLiked: false,
      isBookmarked: true,
    },
  }

  return discussions[id as keyof typeof discussions] || null
}

// Mock data untuk replies
const getReplies = (discussionId: string) => {
  const replies = {
    "1": [
      {
        id: "r1",
        content: `
          <p>Hai Sarah! Pengalaman yang menarik. Untuk dataset kecil seperti ini, saya sangat merekomendasikan <strong>Few-Shot Learning</strong> dengan Prototypical Networks.</p>
          
          <p>Beberapa teknik yang bisa dicoba:</p>
          <ul>
            <li><strong>Meta-Learning (MAML)</strong> - Model-Agnostic Meta-Learning</li>
            <li><strong>Siamese Networks</strong> - Untuk similarity learning</li>
            <li><strong>Contrastive Learning</strong> - SimCLR atau MoCo</li>
          </ul>
          
          <p>Saya punya paper yang relevan, bisa saya share via email?</p>
        `,
        author: {
          name: "Dr. Budi Santoso",
          username: "budi_santoso",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          role: "ML Researcher",
          institution: "Universitas Indonesia",
          reputation: 1890,
          badge: "Rising Star",
          verified: true,
        },
        createdAt: "2024-01-15T11:15:00Z",
        likes: 8,
        isLiked: false,
        replies: [
          {
            id: "r1_1",
            content: `
              <p>Terima kasih Pak Budi! Prototypical Networks terdengar menarik. Boleh minta papernya? Email saya: sarah.wijaya@itb.ac.id</p>
              
              <p>Untuk Siamese Networks, apakah cocok untuk multi-class classification seperti kasus saya?</p>
            `,
            author: {
              name: "Dr. Sarah Wijaya",
              username: "sarah_wijaya",
              avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
              role: "AI Researcher",
              institution: "Institut Teknologi Bandung",
              reputation: 2450,
              badge: "Expert",
              verified: true,
            },
            createdAt: "2024-01-15T11:30:00Z",
            likes: 3,
            isLiked: false,
          },
        ],
      },
      {
        id: "r2",
        content: `
          <p>Saran saya coba <strong>Synthetic Data Generation</strong> menggunakan GAN atau VAE. Saya pernah berhasil meningkatkan akurasi dari 60% ke 82% dengan teknik ini.</p>
          
          <p>Tools yang bisa digunakan:</p>
          <ul>
            <li><strong>StyleGAN2</strong> - Untuk generate gambar berkualitas tinggi</li>
            <li><strong>CycleGAN</strong> - Untuk domain adaptation</li>
            <li><strong>DCGAN</strong> - Lebih simple, cocok untuk pemula</li>
          </ul>
          
          <p>Mau diskusi lebih lanjut? Saya ada waktu untuk video call minggu depan.</p>
        `,
        author: {
          name: "Maya Sari Putri",
          username: "maya_sari",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          role: "Computer Vision Engineer",
          institution: "Gojek",
          reputation: 1650,
          badge: "Industry Expert",
          verified: true,
        },
        createdAt: "2024-01-15T12:45:00Z",
        likes: 12,
        isLiked: true,
        replies: [],
      },
      {
        id: "r3",
        content: `
          <p>Pengalaman saya dengan dataset kecil, <strong>Ensemble Methods</strong> sangat efektif:</p>
          
          <ol>
            <li><strong>Bagging</strong> - Multiple models dengan different random seeds</li>
            <li><strong>Boosting</strong> - AdaBoost atau Gradient Boosting</li>
            <li><strong>Stacking</strong> - Combine different architectures</li>
          </ol>
          
          <p>Plus, coba juga <strong>Test Time Augmentation (TTA)</strong> untuk inference. Bisa boost akurasi 2-3%.</p>
          
          <p>Btw, datasetnya bisa dishare? Mungkin bisa kolaborasi untuk paper 📄</p>
        `,
        author: {
          name: "Reza Firmansyah",
          username: "reza_firman",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
          role: "PhD Student",
          institution: "Universitas Gadjah Mada",
          reputation: 980,
          badge: "Student",
          verified: false,
        },
        createdAt: "2024-01-15T14:20:00Z",
        likes: 6,
        isLiked: false,
        replies: [],
      },
    ],
    "2": [
      {
        id: "r4",
        content: `
          <p>Proyek yang sangat menarik Prof! Saya researcher di bidang material science dengan fokus pada perovskite solar cells.</p>
          
          <p>Expertise saya:</p>
          <ul>
            <li>🔬 Perovskite material synthesis</li>
            <li>⚡ Stability testing untuk iklim tropis</li>
            <li>📊 Characterization (XRD, SEM, UV-Vis)</li>
          </ul>
          
          <p>Saya tertarik untuk bergabung! Sudah email CV ke ahmad.fauzi@itb.ac.id</p>
        `,
        author: {
          name: "Dr. Lisa Handayani",
          username: "lisa_handayani",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
          role: "Material Scientist",
          institution: "LIPI",
          reputation: 2100,
          badge: "Expert",
          verified: true,
        },
        createdAt: "2024-01-14T15:30:00Z",
        likes: 15,
        isLiked: false,
        replies: [],
      },
      {
        id: "r5",
        content: `
          <p>Sebagai electrical engineer yang fokus di power systems, saya sangat tertarik dengan aspek grid integration-nya.</p>
          
          <p>Pertanyaan:</p>
          <ul>
            <li>Bagaimana rencana untuk smart inverter technology?</li>
            <li>Apakah sudah ada simulasi untuk grid stability?</li>
            <li>Rencana untuk energy storage integration?</li>
          </ul>
          
          <p>Saya punya pengalaman dengan microgrid projects di remote areas. Mungkin bisa berkontribusi untuk deployment strategy.</p>
        `,
        author: {
          name: "Ir. Andi Wijaya",
          username: "andi_wijaya",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          role: "Power Systems Engineer",
          institution: "PLN",
          reputation: 1750,
          badge: "Industry Expert",
          verified: true,
        },
        createdAt: "2024-01-14T16:45:00Z",
        likes: 9,
        isLiked: false,
        replies: [],
      },
    ],
  }

  return replies[discussionId as keyof typeof replies] || []
}

// Mock data untuk related discussions
const getRelatedDiscussions = (currentId: string) => [
  {
    id: "3",
    title: "Implementasi IoT untuk monitoring sistem solar panel",
    author: "Dr. Siti Nurhaliza",
    replies: 15,
    likes: 23,
    category: "IoT",
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "4",
    title: "Optimasi hyperparameter untuk deep learning model",
    author: "Prof. Bambang Susilo",
    replies: 8,
    likes: 18,
    category: "Machine Learning",
    createdAt: "2024-01-12T14:30:00Z",
  },
  {
    id: "5",
    title: "Kolaborasi riset AI untuk healthcare di Indonesia",
    author: "Dr. Fitri Handayani",
    replies: 22,
    likes: 35,
    category: "Healthcare AI",
    createdAt: "2024-01-08T11:15:00Z",
  },
]

export default function DiscussionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [discussion, setDiscussion] = useState<any>(null)
  const [replies, setReplies] = useState<any[]>([])
  const [relatedDiscussions, setRelatedDiscussions] = useState<any[]>([])
  const [newReply, setNewReply] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  useEffect(() => {
    const loadDiscussion = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const discussionData = getDiscussionDetail(params.id as string)
      if (!discussionData) {
        router.push("/incubator/community")
        return
      }

      setDiscussion(discussionData)
      setReplies(getReplies(params.id as string))
      setRelatedDiscussions(getRelatedDiscussions(params.id as string))
      setIsLoading(false)
    }

    loadDiscussion()
  }, [params.id, router])

  const handleLike = () => {
    if (!discussion) return
    setDiscussion({
      ...discussion,
      stats: {
        ...discussion.stats,
        likes: discussion.isLiked ? discussion.stats.likes - 1 : discussion.stats.likes + 1,
      },
      isLiked: !discussion.isLiked,
    })
    toast.success(discussion.isLiked ? "Like dihapus" : "Diskusi dilike!")
  }

  const handleBookmark = () => {
    if (!discussion) return
    setDiscussion({
      ...discussion,
      stats: {
        ...discussion.stats,
        bookmarks: discussion.isBookmarked ? discussion.stats.bookmarks - 1 : discussion.stats.bookmarks + 1,
      },
      isBookmarked: !discussion.isBookmarked,
    })
    toast.success(discussion.isBookmarked ? "Bookmark dihapus" : "Diskusi dibookmark!")
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link diskusi disalin ke clipboard!")
  }

  const handleReply = () => {
    if (!newReply.trim()) return

    const reply = {
      id: `r${Date.now()}`,
      content: `<p>${newReply}</p>`,
      author: {
        name: "Current User",
        username: "current_user",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Researcher",
        institution: "Your Institution",
        reputation: 100,
        badge: "New Member",
        verified: false,
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: [],
    }

    setReplies([...replies, reply])
    setNewReply("")
    setReplyingTo(null)
    toast.success("Reply berhasil ditambahkan!")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Baru saja"
    if (diffInHours < 24) return `${diffInHours} jam lalu`
    if (diffInHours < 48) return "Kemarin"
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <IncubatorNav />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!discussion) {
    return (
      <div className="min-h-screen bg-gray-50">
        <IncubatorNav />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Diskusi tidak ditemukan</h1>
            <Button asChild>
              <Link href="/incubator/community">Kembali ke Komunitas</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <IncubatorNav />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/incubator">Incubator</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/incubator/community">Komunitas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Diskusi</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Discussion Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-2xl font-bold mb-2">
                          {discussion.title}
                          {discussion.isHot && <Badge className="ml-2 bg-red-100 text-red-800">🔥 Hot</Badge>}
                          {discussion.isPinned && <Badge className="ml-2 bg-blue-100 text-blue-800">📌 Pinned</Badge>}
                        </h1>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{discussion.author.name}</span>
                            {discussion.author.verified && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                ✓ Verified
                              </Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {discussion.author.role}
                          </Badge>
                          <span>•</span>
                          <span>{discussion.author.institution}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span>{discussion.author.reputation}</span>
                          </div>
                        </div>
                      </div>
                      <Badge>{discussion.category}</Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(discussion.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{discussion.stats.views} views</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {discussion.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Discussion Content */}
                <div
                  className="prose prose-gray max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: discussion.content }}
                />

                {/* Images */}
                {discussion.images && discussion.images.length > 0 && (
                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {discussion.images.map((image: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.caption}
                            width={400}
                            height={300}
                            className="rounded-lg object-cover w-full"
                          />
                          <p className="text-sm text-gray-600 text-center">{image.caption}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {discussion.attachments && discussion.attachments.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">📎 Lampiran:</h4>
                    <div className="space-y-2">
                      {discussion.attachments.map((attachment: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="p-2 bg-white rounded">
                            <Download className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{attachment.name}</p>
                            <p className="text-xs text-gray-500">{attachment.size}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Button
                      variant={discussion.isLiked ? "default" : "outline"}
                      size="sm"
                      onClick={handleLike}
                      className={discussion.isLiked ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {discussion.stats.likes}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setReplyingTo("main")}>
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    <Button
                      variant={discussion.isBookmarked ? "default" : "outline"}
                      size="sm"
                      onClick={handleBookmark}
                    >
                      <Bookmark className="h-4 w-4 mr-1" />
                      {discussion.stats.bookmarks}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Flag className="h-4 w-4 mr-2" />
                        Report
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>

            {/* Reply Form */}
            {replyingTo === "main" && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">💬 Tulis Reply</h3>
                  <Textarea
                    placeholder="Bagikan pemikiran, saran, atau pengalaman Anda..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="mb-4"
                    rows={4}
                  />
                  <div className="flex items-center gap-2">
                    <Button onClick={handleReply} disabled={!newReply.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Reply
                    </Button>
                    <Button variant="outline" onClick={() => setReplyingTo(null)}>
                      Batal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Replies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {replies.length} Replies
                </CardTitle>
              </CardHeader>
              <CardContent>
                {replies.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Belum ada reply. Jadilah yang pertama!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {replies.map((reply) => (
                      <div key={reply.id} className="border-l-2 border-gray-100 pl-4">
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{reply.author.name}</span>
                              {reply.author.verified && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                  ✓
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {reply.author.role}
                              </Badge>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                            </div>
                            <div
                              className="prose prose-sm prose-gray max-w-none mb-3"
                              dangerouslySetInnerHTML={{ __html: reply.content }}
                            />
                            <div className="flex items-center gap-4 text-sm">
                              <button
                                className={`flex items-center gap-1 hover:text-red-600 transition-colors ${
                                  reply.isLiked ? "text-red-600" : "text-gray-500"
                                }`}
                              >
                                <Heart className={`h-4 w-4 ${reply.isLiked ? "fill-current" : ""}`} />
                                <span>{reply.likes}</span>
                              </button>
                              <button className="text-gray-500 hover:text-purple-600 transition-colors">Reply</button>
                            </div>
                          </div>
                        </div>

                        {/* Nested Replies */}
                        {reply.replies && reply.replies.length > 0 && (
                          <div className="ml-8 mt-4 space-y-4">
                            {reply.replies.map((nestedReply: any) => (
                              <div key={nestedReply.id} className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={nestedReply.author.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{nestedReply.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{nestedReply.author.name}</span>
                                    {nestedReply.author.verified && (
                                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                        ✓
                                      </Badge>
                                    )}
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-500">{formatDate(nestedReply.createdAt)}</span>
                                  </div>
                                  <div
                                    className="prose prose-sm prose-gray max-w-none mb-2"
                                    dangerouslySetInnerHTML={{ __html: nestedReply.content }}
                                  />
                                  <div className="flex items-center gap-4 text-sm">
                                    <button
                                      className={`flex items-center gap-1 hover:text-red-600 transition-colors ${
                                        nestedReply.isLiked ? "text-red-600" : "text-gray-500"
                                      }`}
                                    >
                                      <Heart className={`h-4 w-4 ${nestedReply.isLiked ? "fill-current" : ""}`} />
                                      <span>{nestedReply.likes}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Profil Penulis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <Avatar className="h-20 w-20 mx-auto mb-3">
                    <AvatarImage src={discussion.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{discussion.author.name}</h3>
                  <p className="text-sm text-gray-600">{discussion.author.role}</p>
                  <p className="text-sm text-gray-500">{discussion.author.institution}</p>
                  <Badge className="mt-2">{discussion.author.badge}</Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Reputation:</span>
                    <span className="font-medium">{discussion.author.reputation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Posts:</span>
                    <span className="font-medium">{discussion.author.totalPosts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Likes:</span>
                    <span className="font-medium">{discussion.author.totalLikes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Member Since:</span>
                    <span className="font-medium">
                      {new Date(discussion.author.joinDate).toLocaleDateString("id-ID", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <p className="text-sm text-gray-700">{discussion.author.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {discussion.author.expertise.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Follow
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Discussions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Diskusi Terkait
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedDiscussions.map((related) => (
                    <div key={related.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <Link
                        href={`/incubator/community/discussion/${related.id}`}
                        className="block hover:text-purple-600 transition-colors"
                      >
                        <h4 className="font-medium text-sm mb-2 line-clamp-2">{related.title}</h4>
                      </Link>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>by {related.author}</span>
                        <div className="flex items-center gap-2">
                          <span>{related.replies} replies</span>
                          <span>•</span>
                          <span>{related.likes} likes</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs mt-2">
                        {related.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Discussion Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Statistik
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>👀 Views:</span>
                    <span className="font-medium">{discussion.stats.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>👍 Likes:</span>
                    <span className="font-medium">{discussion.stats.likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>💬 Replies:</span>
                    <span className="font-medium">{discussion.stats.replies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🔖 Bookmarks:</span>
                    <span className="font-medium">{discussion.stats.bookmarks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>📤 Shares:</span>
                    <span className="font-medium">{discussion.stats.shares}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
