// Portfolio data structure untuk multiple users
export interface PortfolioUser {
  id: string
  username: string
  name: string
  title: string
  bio: string
  profileImage: string
  coverImage: string
  location: string
  email: string
  phone: string
  website?: string
  socialMedia: {
    linkedin?: string
    github?: string
    instagram?: string
    twitter?: string
    youtube?: string
    behance?: string
  }
  stats: {
    completedProjects: number
    totalFunding: number
    followers: number
    rating: number
  }
  skills: string[]
  projects: Array<{
    id: string
    title: string
    description: string
    image: string
    category: string
    status: string
    year: string
    funding: string
    technologies: string[]
    likes: number
    views: number
    link: string
  }>
  mediaGallery: Array<{
    id: string
    type: "video" | "image" | "document"
    title: string
    url: string
    thumbnail?: string
    description: string
    date: string
  }>
  achievements: Array<{
    title: string
    description: string
    organization: string
    year: string
    image: string
  }>
  testimonials: Array<{
    name: string
    role: string
    avatar: string
    content: string
    rating: number
    date: string
  }>
  experience: Array<{
    position: string
    company: string
    period: string
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    year: string
    gpa: string | null
  }>
}

export const portfolioUsers: Record<string, PortfolioUser> = {
  "sari-dewi": {
    id: "1",
    username: "sari-dewi",
    name: "Sari Dewi Kusuma",
    title: "Entrepreneur & Tech Innovator",
    bio: "Passionate entrepreneur yang fokus pada pengembangan teknologi berkelanjutan dan pemberdayaan komunitas melalui inovasi digital. Berpengalaman dalam membangun startup dari ide hingga scale-up.",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop",
    location: "Jakarta, Indonesia",
    email: "sari.dewi@example.com",
    phone: "+62 812 3456 7890",
    website: "www.saridewi.dev",
    socialMedia: {
      linkedin: "https://linkedin.com/in/saridewi",
      github: "https://github.com/saridewi",
      instagram: "https://instagram.com/saridewi",
      twitter: "https://twitter.com/saridewi",
    },
    stats: {
      completedProjects: 12,
      totalFunding: 8.5,
      followers: 2847,
      rating: 4.9,
    },
    skills: [
      "Product Management",
      "UI/UX Design",
      "React.js",
      "Node.js",
      "Python",
      "Machine Learning",
      "Blockchain",
      "IoT",
      "Business Strategy",
      "Team Leadership",
      "Public Speaking",
      "Grant Writing",
    ],
    projects: [
      {
        id: "1",
        title: "GreenTech Solutions - Panel Surya Portable",
        description:
          "Sistem panel surya portable untuk daerah terpencil dengan teknologi IoT monitoring dan mobile app control.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
        category: "teknologi",
        status: "Completed",
        year: "2023",
        funding: "Rp 5.2M",
        technologies: ["IoT", "React Native", "Python", "Solar Tech"],
        likes: 234,
        views: 1847,
        link: "/projects/1",
      },
      {
        id: "2",
        title: "EcoWaste Management System",
        description:
          "Platform digital untuk pengelolaan sampah berbasis komunitas dengan sistem reward dan gamifikasi.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
        category: "lingkungan",
        status: "In Progress",
        year: "2023",
        funding: "Rp 3.8M",
        technologies: ["React", "Node.js", "MongoDB", "Blockchain"],
        likes: 189,
        views: 1234,
        link: "/projects/2",
      },
      {
        id: "3",
        title: "EduTech Learning Platform",
        description: "Platform pembelajaran online dengan AI personalization untuk siswa di daerah terpencil.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
        category: "edukasi",
        status: "Completed",
        year: "2022",
        funding: "Rp 4.1M",
        technologies: ["AI/ML", "React", "Python", "TensorFlow"],
        likes: 312,
        views: 2156,
        link: "/projects/3",
      },
    ],
    mediaGallery: [
      {
        id: "1",
        type: "video",
        title: "Pitch Presentation - GreenTech Solutions",
        url: "https://www.youtube.com/embed/Iqr3XIhSnUQ",
        thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
        description: "Presentasi pitch untuk proyek GreenTech Solutions di kompetisi startup nasional",
        date: "2023-06-15",
      },
      {
        id: "2",
        type: "image",
        title: "Team Building Workshop",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
        description: "Workshop team building dengan tim GreenTech Solutions",
        date: "2023-07-01",
      },
      {
        id: "3",
        type: "image",
        title: "Product Development Process",
        url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
        description: "Proses pengembangan produk panel surya portable",
        date: "2023-04-15",
      },
      {
        id: "4",
        type: "document",
        title: "Business Plan - GreenTech Solutions",
        url: "/documents/business-plan-greentech.pdf",
        description: "Rencana bisnis lengkap untuk GreenTech Solutions",
        date: "2023-01-10",
      },
    ],
    achievements: [
      {
        title: "Young Innovator of the Year 2023",
        description: "Penghargaan untuk inovasi terbaik di bidang teknologi berkelanjutan",
        organization: "Indonesia Innovation Awards",
        year: "2023",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      },
      {
        title: "Best Startup Pitch - TechCrunch Startup Battlefield",
        description: "Juara 1 kompetisi pitch startup tingkat Asia Tenggara",
        organization: "TechCrunch",
        year: "2023",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      },
    ],
    testimonials: [
      {
        name: "Dr. Bambang Susilo",
        role: "Mentor & Angel Investor",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        content:
          "Sari adalah salah satu entrepreneur muda paling berbakat yang pernah saya temui. Visinya yang jelas dan kemampuan eksekusi yang luar biasa membuatnya berhasil membangun startup yang berdampak positif.",
        rating: 5,
        date: "September 2023",
      },
      {
        name: "Prof. Dr. Indira Sari",
        role: "Dosen Pembimbing - ITB",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        content:
          "Selama menjadi mahasiswa, Sari selalu menunjukkan dedikasi tinggi terhadap inovasi teknologi. Proyek-proyeknya selalu memiliki dampak sosial yang nyata dan berkelanjutan.",
        rating: 5,
        date: "Agustus 2023",
      },
    ],
    experience: [
      {
        position: "Founder & CEO",
        company: "GreenTech Solutions",
        period: "2021 - Present",
        description:
          "Memimpin pengembangan teknologi panel surya portable untuk daerah terpencil. Berhasil mengumpulkan funding Series A sebesar $2M dan melayani 50+ desa di Indonesia.",
      },
      {
        position: "Product Manager",
        company: "TechForGood Indonesia",
        period: "2020 - 2021",
        description:
          "Mengelola pengembangan platform digital untuk NGO dan social enterprise. Meningkatkan user engagement sebesar 300% dalam 1 tahun.",
      },
    ],
    education: [
      {
        degree: "S1 Teknik Elektro",
        institution: "Institut Teknologi Bandung",
        year: "2015 - 2019",
        gpa: "3.85/4.00",
      },
      {
        degree: "Executive Program - Entrepreneurship",
        institution: "Stanford University",
        year: "2022",
        gpa: null,
      },
    ],
  },

  "andi-pratama": {
    id: "2",
    username: "andi-pratama",
    name: "Andi Pratama Wijaya",
    title: "Mobile App Developer & UI/UX Designer",
    bio: "Passionate mobile developer dengan 5+ tahun pengalaman dalam mengembangkan aplikasi iOS dan Android. Spesialisasi dalam creating user-friendly interfaces dan seamless user experiences untuk berbagai industri.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=600&fit=crop",
    location: "Bandung, Indonesia",
    email: "andi.pratama@example.com",
    phone: "+62 813 4567 8901",
    website: "www.andipratama.dev",
    socialMedia: {
      linkedin: "https://linkedin.com/in/andipratama",
      github: "https://github.com/andipratama",
      instagram: "https://instagram.com/andipratama.dev",
      behance: "https://behance.net/andipratama",
    },
    stats: {
      completedProjects: 18,
      totalFunding: 4.2,
      followers: 1543,
      rating: 4.8,
    },
    skills: [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "Figma",
      "Adobe XD",
      "UI/UX Design",
      "Firebase",
      "GraphQL",
      "TypeScript",
      "Git",
      "Agile",
    ],
    projects: [
      {
        id: "4",
        title: "HealthTracker - Personal Health Monitor",
        description:
          "Aplikasi mobile untuk monitoring kesehatan personal dengan integrasi wearable devices dan AI health insights.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        category: "kesehatan",
        status: "Completed",
        year: "2023",
        funding: "Rp 2.8M",
        technologies: ["React Native", "Firebase", "HealthKit", "AI/ML"],
        likes: 156,
        views: 987,
        link: "/projects/4",
      },
      {
        id: "5",
        title: "EduKids - Interactive Learning App",
        description:
          "Aplikasi pembelajaran interaktif untuk anak-anak usia 5-12 tahun dengan gamifikasi dan AR features.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
        category: "edukasi",
        status: "In Progress",
        year: "2023",
        funding: "Rp 3.5M",
        technologies: ["Flutter", "ARCore", "Unity", "Firebase"],
        likes: 203,
        views: 1432,
        link: "/projects/5",
      },
      {
        id: "6",
        title: "FoodieConnect - Social Food Discovery",
        description:
          "Platform social untuk food enthusiasts dengan fitur review, recommendation, dan food photography sharing.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        category: "sosial",
        status: "Completed",
        year: "2022",
        funding: "Rp 1.9M",
        technologies: ["React Native", "Node.js", "MongoDB", "AWS"],
        likes: 289,
        views: 2156,
        link: "/projects/6",
      },
    ],
    mediaGallery: [
      {
        id: "3",
        type: "video",
        title: "App Development Process - HealthTracker",
        url: "https://www.youtube.com/embed/Iqr3XIhSnUQ",
        thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        description: "Behind the scenes pengembangan aplikasi HealthTracker dari konsep hingga launch",
        date: "2023-08-20",
      },
      {
        id: "4",
        type: "image",
        title: "UI/UX Design Workshop",
        url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop",
        description: "Workshop UI/UX design untuk developer muda di Bandung",
        date: "2023-07-15",
      },
      {
        id: "5",
        type: "image",
        title: "Mobile App Showcase",
        url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
        description: "Showcase aplikasi mobile terbaru di Tech Conference Bandung 2023",
        date: "2023-09-10",
      },
      {
        id: "6",
        type: "document",
        title: "Mobile Development Best Practices",
        url: "/documents/mobile-dev-best-practices.pdf",
        description: "Panduan best practices untuk mobile development",
        date: "2023-06-20",
      },
    ],
    achievements: [
      {
        title: "Best Mobile App - Indonesia Developer Awards 2023",
        description: "Penghargaan untuk aplikasi HealthTracker sebagai mobile app terbaik",
        organization: "Indonesia Developer Community",
        year: "2023",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      },
      {
        title: "Google Play Store Featured Developer",
        description: "Aplikasi FoodieConnect dipilih sebagai featured app di Google Play Store",
        organization: "Google",
        year: "2022",
        image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
      },
    ],
    testimonials: [
      {
        name: "Sarah Indira",
        role: "Product Manager - Tokopedia",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        content:
          "Andi adalah developer yang sangat detail dan memiliki sense of design yang baik. Kolaborasi dengan dia selalu menghasilkan produk yang berkualitas tinggi.",
        rating: 5,
        date: "Oktober 2023",
      },
      {
        name: "Budi Santoso",
        role: "Startup Founder",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        content:
          "Andi membantu kami mengembangkan MVP dalam waktu singkat dengan kualitas yang sangat baik. Highly recommended!",
        rating: 5,
        date: "September 2023",
      },
    ],
    experience: [
      {
        position: "Senior Mobile Developer",
        company: "TechStart Indonesia",
        period: "2022 - Present",
        description:
          "Lead mobile development team untuk berbagai proyek startup. Mengembangkan 10+ aplikasi mobile dengan total 500K+ downloads.",
      },
      {
        position: "Mobile Developer",
        company: "Digital Agency XYZ",
        period: "2020 - 2022",
        description:
          "Mengembangkan aplikasi mobile untuk klien enterprise dan startup. Fokus pada performance optimization dan user experience.",
      },
    ],
    education: [
      {
        degree: "S1 Teknik Informatika",
        institution: "Universitas Padjadjaran",
        year: "2016 - 2020",
        gpa: "3.72/4.00",
      },
      {
        degree: "Certificate - iOS Development",
        institution: "Apple Developer Academy",
        year: "2021",
        gpa: null,
      },
    ],
  },

  "maya-sari": {
    id: "3",
    username: "maya-sari",
    name: "Dr. Maya Sari Putri",
    title: "Research Scientist & Data Analyst",
    bio: "Research scientist dengan fokus pada machine learning dan data science untuk social impact. Berpengalaman dalam menganalisis big data untuk memecahkan masalah sosial dan lingkungan di Indonesia.",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    location: "Yogyakarta, Indonesia",
    email: "maya.sari@example.com",
    phone: "+62 814 5678 9012",
    website: "www.mayasari.research",
    socialMedia: {
      linkedin: "https://linkedin.com/in/mayasari",
      github: "https://github.com/mayasari",
      twitter: "https://twitter.com/mayasari_phd",
    },
    stats: {
      completedProjects: 15,
      totalFunding: 12.3,
      followers: 3421,
      rating: 4.9,
    },
    skills: [
      "Machine Learning",
      "Data Science",
      "Python",
      "R",
      "TensorFlow",
      "PyTorch",
      "Statistical Analysis",
      "Research Methodology",
      "Academic Writing",
      "Jupyter",
      "SQL",
      "Big Data Analytics",
    ],
    projects: [
      {
        id: "7",
        title: "Climate Change Prediction Model",
        description:
          "Model machine learning untuk prediksi perubahan iklim di Indonesia berdasarkan data historis dan satelit.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
        category: "penelitian",
        status: "Completed",
        year: "2023",
        funding: "Rp 8.5M",
        technologies: ["Python", "TensorFlow", "Satellite Data", "GIS"],
        likes: 445,
        views: 3421,
        link: "/projects/7",
      },
      {
        id: "8",
        title: "Education Gap Analysis Indonesia",
        description:
          "Analisis kesenjangan pendidikan di Indonesia menggunakan big data dan machine learning untuk policy recommendations.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
        category: "edukasi",
        status: "In Progress",
        year: "2023",
        funding: "Rp 6.7M",
        technologies: ["R", "Python", "Statistical Modeling", "Data Viz"],
        likes: 312,
        views: 2156,
        link: "/projects/8",
      },
      {
        id: "9",
        title: "Healthcare Access Optimization",
        description:
          "Optimasi akses layanan kesehatan di daerah terpencil menggunakan predictive analytics dan geospatial analysis.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
        category: "kesehatan",
        status: "Completed",
        year: "2022",
        funding: "Rp 4.9M",
        technologies: ["Python", "GIS", "Machine Learning", "Healthcare Data"],
        likes: 267,
        views: 1876,
        link: "/projects/9",
      },
    ],
    mediaGallery: [
      {
        id: "7",
        type: "video",
        title: "Research Presentation - Climate Change Model",
        url: "https://www.youtube.com/embed/Iqr3XIhSnUQ",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
        description: "Presentasi hasil penelitian model prediksi perubahan iklim di konferensi internasional",
        date: "2023-09-10",
      },
      {
        id: "8",
        type: "image",
        title: "Data Science Workshop",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        description: "Workshop data science untuk mahasiswa dan peneliti muda",
        date: "2023-08-15",
      },
      {
        id: "9",
        type: "document",
        title: "Research Paper - Education Gap Analysis",
        url: "/documents/education-gap-analysis.pdf",
        description: "Paper penelitian tentang analisis kesenjangan pendidikan di Indonesia",
        date: "2023-07-20",
      },
    ],
    achievements: [
      {
        title: "Outstanding Research Award - IEEE Indonesia",
        description: "Penghargaan untuk penelitian terbaik di bidang machine learning for social impact",
        organization: "IEEE Indonesia Section",
        year: "2023",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      },
      {
        title: "Best Paper Award - ICACSIS 2022",
        description: "Paper terbaik di International Conference on Advanced Computer Science and Information Systems",
        organization: "ICACSIS",
        year: "2022",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
      },
    ],
    testimonials: [
      {
        name: "Prof. Dr. Bambang Riyanto",
        role: "Research Supervisor - UGM",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        content:
          "Maya adalah peneliti yang sangat teliti dan memiliki passion tinggi untuk menggunakan teknologi dalam menyelesaikan masalah sosial. Hasil penelitiannya selalu berkualitas tinggi.",
        rating: 5,
        date: "November 2023",
      },
    ],
    experience: [
      {
        position: "Senior Research Scientist",
        company: "Indonesian Institute of Sciences (LIPI)",
        period: "2021 - Present",
        description:
          "Memimpin tim penelitian dalam proyek-proyek machine learning untuk social impact. Mempublikasikan 15+ paper di jurnal internasional.",
      },
      {
        position: "Data Scientist",
        company: "Ministry of Education and Culture",
        period: "2019 - 2021",
        description:
          "Menganalisis data pendidikan nasional untuk mendukung kebijakan pendidikan. Mengembangkan dashboard analytics untuk monitoring kualitas pendidikan.",
      },
    ],
    education: [
      {
        degree: "Ph.D Computer Science",
        institution: "Universitas Gadjah Mada",
        year: "2015 - 2019",
        gpa: "3.95/4.00",
      },
      {
        degree: "S2 Teknik Informatika",
        institution: "Institut Teknologi Bandung",
        year: "2013 - 2015",
        gpa: "3.88/4.00",
      },
    ],
  },

  "reza-firmansyah": {
    id: "4",
    username: "reza-firmansyah",
    name: "Reza Firmansyah",
    title: "Creative Director & Digital Artist",
    bio: "Creative director dengan passion dalam digital art, motion graphics, dan brand identity design. Berpengalaman dalam menciptakan visual identity untuk startup dan brand lokal Indonesia.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=600&fit=crop",
    location: "Bali, Indonesia",
    email: "reza.firmansyah@example.com",
    phone: "+62 815 6789 0123",
    website: "www.rezafirmansyah.art",
    socialMedia: {
      instagram: "https://instagram.com/rezafirmansyah.art",
      behance: "https://behance.net/rezafirmansyah",
      youtube: "https://youtube.com/rezafirmansyah",
      linkedin: "https://linkedin.com/in/rezafirmansyah",
    },
    stats: {
      completedProjects: 25,
      totalFunding: 3.8,
      followers: 5672,
      rating: 4.7,
    },
    skills: [
      "Adobe Creative Suite",
      "After Effects",
      "Cinema 4D",
      "Figma",
      "Sketch",
      "Brand Identity",
      "Motion Graphics",
      "3D Modeling",
      "Video Editing",
      "Typography",
      "Color Theory",
      "Art Direction",
    ],
    projects: [
      {
        id: "10",
        title: "Nusantara Brand Identity Project",
        description:
          "Pengembangan brand identity untuk 20+ UMKM lokal Indonesia dengan konsep modern-traditional fusion.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
        category: "desain",
        status: "Completed",
        year: "2023",
        funding: "Rp 2.1M",
        technologies: ["Adobe Illustrator", "Photoshop", "Brand Strategy"],
        likes: 389,
        views: 2847,
        link: "/projects/10",
      },
      {
        id: "11",
        title: "Digital Art NFT Collection",
        description: "Koleksi digital art NFT yang menampilkan kebudayaan Indonesia dengan style contemporary art.",
        image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=300&fit=crop",
        category: "seni",
        status: "In Progress",
        year: "2023",
        funding: "Rp 1.5M",
        technologies: ["Digital Art", "Blockchain", "NFT", "3D Art"],
        likes: 567,
        views: 4231,
        link: "/projects/11",
      },
      {
        id: "12",
        title: "Tourism Campaign - Wonderful Indonesia",
        description:
          "Campaign visual dan motion graphics untuk promosi pariwisata Indonesia di platform digital internasional.",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
        category: "kampanye",
        status: "Completed",
        year: "2022",
        funding: "Rp 4.2M",
        technologies: ["After Effects", "Cinema 4D", "Video Production"],
        likes: 723,
        views: 5643,
        link: "/projects/12",
      },
    ],
    mediaGallery: [
      {
        id: "10",
        type: "video",
        title: "Creative Process - Nusantara Branding",
        url: "https://www.youtube.com/embed/Iqr3XIhSnUQ",
        thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
        description: "Behind the scenes proses kreatif dalam mengembangkan brand identity untuk UMKM Indonesia",
        date: "2023-10-05",
      },
      {
        id: "11",
        type: "image",
        title: "Digital Art Exhibition",
        url: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&h=600&fit=crop",
        description: "Pameran digital art pertama di Bali dengan tema Indonesian Contemporary Culture",
        date: "2023-08-20",
      },
      {
        id: "12",
        type: "image",
        title: "Brand Identity Showcase",
        url: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
        description: "Showcase brand identity terbaru untuk klien UMKM di Creative Festival Bali",
        date: "2023-09-15",
      },
    ],
    achievements: [
      {
        title: "Indonesia Creative Awards - Best Brand Identity 2023",
        description: "Penghargaan untuk project Nusantara Brand Identity sebagai brand identity terbaik",
        organization: "Indonesia Creative Industry Association",
        year: "2023",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
      },
      {
        title: "Cannes Lions - Bronze Award",
        description: "Bronze award untuk campaign Wonderful Indonesia di kategori Digital Craft",
        organization: "Cannes Lions",
        year: "2022",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      },
    ],
    testimonials: [
      {
        name: "Indira Kalistha",
        role: "Brand Manager - Local Brand",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        content:
          "Reza berhasil menangkap essence brand kami dan mentransformasikannya menjadi visual identity yang powerful. Hasil kerjanya selalu exceed expectations.",
        rating: 5,
        date: "Oktober 2023",
      },
    ],
    experience: [
      {
        position: "Creative Director",
        company: "Bali Creative Studio",
        period: "2021 - Present",
        description:
          "Memimpin tim kreatif dalam mengembangkan brand identity dan campaign visual untuk klien lokal dan internasional.",
      },
      {
        position: "Senior Graphic Designer",
        company: "Jakarta Creative Agency",
        period: "2019 - 2021",
        description:
          "Mengembangkan visual design untuk berbagai campaign digital dan print media untuk brand-brand ternama Indonesia.",
      },
    ],
    education: [
      {
        degree: "S1 Desain Komunikasi Visual",
        institution: "Institut Seni Budaya Indonesia",
        year: "2015 - 2019",
        gpa: "3.76/4.00",
      },
      {
        degree: "Certificate - Motion Graphics",
        institution: "School of Motion",
        year: "2020",
        gpa: null,
      },
    ],
  },

  "fitri-handayani": {
    id: "5",
    username: "fitri-handayani",
    name: "Fitri Handayani",
    title: "Social Entrepreneur & Community Builder",
    bio: "Social entrepreneur yang berdedikasi untuk pemberdayaan perempuan dan pengembangan komunitas di daerah rural Indonesia. Fokus pada sustainable development dan women empowerment programs.",
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=600&fit=crop",
    location: "Solo, Indonesia",
    email: "fitri.handayani@example.com",
    phone: "+62 816 7890 1234",
    website: "www.fitrihandayani.org",
    socialMedia: {
      linkedin: "https://linkedin.com/in/fitrihandayani",
      instagram: "https://instagram.com/fitrihandayani.social",
      twitter: "https://twitter.com/fitrihandayani",
    },
    stats: {
      completedProjects: 8,
      totalFunding: 15.7,
      followers: 4521,
      rating: 4.9,
    },
    skills: [
      "Community Development",
      "Project Management",
      "Social Impact",
      "Grant Writing",
      "Public Speaking",
      "Workshop Facilitation",
      "Microfinance",
      "Women Empowerment",
      "Sustainable Development",
      "Partnership Building",
      "Fundraising",
      "Program Evaluation",
    ],
    projects: [
      {
        id: "13",
        title: "Women Entrepreneur Network",
        description:
          "Program pemberdayaan perempuan entrepreneur di desa-desa Jawa Tengah dengan pelatihan bisnis dan akses microfinance.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
        category: "sosial",
        status: "In Progress",
        year: "2023",
        funding: "Rp 8.9M",
        technologies: ["Community Program", "Microfinance", "Training"],
        likes: 456,
        views: 3214,
        link: "/projects/13",
      },
      {
        id: "14",
        title: "Sustainable Agriculture Program",
        description:
          "Program pertanian berkelanjutan untuk petani kecil dengan fokus pada organic farming dan direct market access.",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        category: "lingkungan",
        status: "Completed",
        year: "2022",
        funding: "Rp 6.8M",
        technologies: ["Organic Farming", "Market Access", "Training"],
        likes: 334,
        views: 2156,
        link: "/projects/14",
      },
      {
        id: "15",
        title: "Digital Literacy for Rural Communities",
        description:
          "Program literasi digital untuk masyarakat desa dengan fokus pada e-commerce dan digital marketing untuk UMKM.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
        category: "edukasi",
        status: "Completed",
        year: "2023",
        funding: "Rp 4.2M",
        technologies: ["Digital Training", "E-commerce", "Community Program"],
        likes: 278,
        views: 1876,
        link: "/projects/15",
      },
    ],
    mediaGallery: [
      {
        id: "13",
        type: "video",
        title: "Women Entrepreneur Success Stories",
        url: "https://www.youtube.com/embed/Iqr3XIhSnUQ",
        thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
        description: "Dokumenter tentang kisah sukses perempuan entrepreneur dari program pemberdayaan",
        date: "2023-09-15",
      },
      {
        id: "14",
        type: "image",
        title: "Community Workshop",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
        description: "Workshop digital literacy untuk ibu-ibu PKK di Desa Sumber Makmur",
        date: "2023-07-20",
      },
      {
        id: "15",
        type: "image",
        title: "Sustainable Agriculture Training",
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        description: "Pelatihan pertanian organik untuk petani di Kabupaten Klaten",
        date: "2023-06-10",
      },
    ],
    achievements: [
      {
        title: "Social Impact Award 2023",
        description: "Penghargaan untuk kontribusi terbaik dalam pemberdayaan masyarakat rural",
        organization: "Indonesia Social Enterprise Network",
        year: "2023",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
      },
      {
        title: "Women Leadership Award",
        description: "Penghargaan kepemimpinan perempuan dalam bidang social entrepreneurship",
        organization: "UN Women Indonesia",
        year: "2022",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
      },
    ],
    testimonials: [
      {
        name: "Ibu Siti Nurhaliza",
        role: "Beneficiary - Women Entrepreneur Program",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        content:
          "Berkat program Mbak Fitri, usaha keripik singkong saya sekarang bisa dijual online dan omzet meningkat 300%. Terima kasih sudah memberdayakan kami.",
        rating: 5,
        date: "November 2023",
      },
    ],
    experience: [
      {
        position: "Founder & Executive Director",
        company: "Nusantara Community Foundation",
        period: "2020 - Present",
        description:
          "Memimpin organisasi non-profit yang fokus pada pemberdayaan masyarakat rural dan women empowerment. Mengelola 15+ program dengan total beneficiary 2000+ orang.",
      },
      {
        position: "Program Manager",
        company: "Indonesia Rural Development Foundation",
        period: "2018 - 2020",
        description:
          "Mengelola program-program pemberdayaan masyarakat di 5 provinsi di Indonesia dengan fokus pada sustainable livelihood.",
      },
    ],
    education: [
      {
        degree: "S2 Pembangunan Sosial dan Kesejahteraan",
        institution: "Universitas Gadjah Mada",
        year: "2016 - 2018",
        gpa: "3.82/4.00",
      },
      {
        degree: "S1 Sosiologi",
        institution: "Universitas Sebelas Maret",
        year: "2012 - 2016",
        gpa: "3.67/4.00",
      },
    ],
  },
}

// Helper function untuk mendapatkan portfolio berdasarkan username
export const getPortfolioByUsername = (username: string): PortfolioUser | null => {
  return portfolioUsers[username] || null
}

// Helper function untuk mendapatkan semua portfolio
export const getAllPortfolios = (): PortfolioUser[] => {
  return Object.values(portfolioUsers)
}

// Untuk backward compatibility dengan kode yang sudah ada
export const portfolioData = portfolioUsers["sari-dewi"]
