export interface ResearchProject {
  id: string
  title: string
  researcher: {
    name: string
    avatar: string
    role: string
    institution: string
    reputation: number
    publications: number
    experience: string
  }
  category: string
  description: string
  fullDescription: string
  funding: number
  targetFunding: number
  backers: number
  stage: string
  duration: string
  location: string
  rating: number
  views: number
  tags: string[]
  images: string[]
  milestones: Array<{
    title: string
    status: "completed" | "active" | "pending"
    date: string
    description: string
  }>
  team: Array<{
    name: string
    role: string
    avatar: string
    expertise: string
  }>
  funders: Array<{
    name: string
    amount: number
    type: string
    logo: string
  }>
  documents: Array<{
    title: string
    type: string
    size: string
    downloadUrl: string
  }>
  updates: Array<{
    id: string
    title: string
    content: string
    date: string
    author: string
    images: string[]
  }>
}

export const researchProjects: ResearchProject[] = [
  {
    id: "1",
    title: "AI untuk Deteksi Dini Penyakit Tanaman",
    researcher: {
      name: "Dr. Sari Indrawati",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      role: "AI Researcher",
      institution: "Institut Teknologi Bandung",
      reputation: 2450,
      publications: 23,
      experience: "8 tahun",
    },
    category: "Artificial Intelligence",
    description:
      "Mengembangkan sistem AI untuk mendeteksi penyakit tanaman secara dini menggunakan computer vision dan machine learning. Sistem ini akan membantu petani mengidentifikasi penyakit tanaman sebelum menyebar luas, sehingga dapat mengurangi kerugian hasil panen.",
    fullDescription: `
      Proyek ini bertujuan untuk mengembangkan sistem deteksi dini penyakit tanaman menggunakan teknologi Artificial Intelligence (AI) dan Computer Vision. Sistem akan menggunakan kamera smartphone atau drone untuk mengambil gambar daun tanaman, kemudian menganalisis gambar tersebut untuk mendeteksi tanda-tanda awal penyakit.

      Teknologi yang digunakan meliputi:
      - Deep Learning dengan Convolutional Neural Networks (CNN)
      - Image Processing dan Computer Vision
      - Mobile Application Development
      - Cloud Computing untuk processing dan storage
      - IoT sensors untuk monitoring lingkungan

      Target utama adalah menciptakan solusi yang mudah digunakan oleh petani dengan akurasi deteksi minimal 95% untuk 10 jenis penyakit tanaman paling umum di Indonesia.
    `,
    funding: 150000000,
    targetFunding: 200000000,
    backers: 12,
    stage: "Prototype",
    duration: "18 bulan",
    location: "Bandung, Indonesia",
    rating: 4.8,
    views: 1250,
    tags: ["AI", "Agriculture", "Computer Vision", "Machine Learning", "IoT"],
    images: [
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
    ],
    milestones: [
      {
        title: "Literature Review & Research Design",
        status: "completed",
        date: "2024-01-15",
        description: "Menyelesaikan review literatur dan merancang metodologi penelitian",
      },
      {
        title: "Data Collection & Dataset Preparation",
        status: "completed",
        date: "2024-02-28",
        description: "Mengumpulkan 10,000+ gambar tanaman dan menyiapkan dataset training",
      },
      {
        title: "Model Development & Training",
        status: "active",
        date: "2024-03-30",
        description: "Mengembangkan dan melatih model CNN untuk deteksi penyakit",
      },
      {
        title: "Mobile App Development",
        status: "pending",
        date: "2024-05-15",
        description: "Mengembangkan aplikasi mobile untuk implementasi sistem",
      },
      {
        title: "Field Testing & Validation",
        status: "pending",
        date: "2024-06-30",
        description: "Melakukan uji coba di lapangan dengan petani mitra",
      },
    ],
    team: [
      {
        name: "Dr. Sari Indrawati",
        role: "Principal Investigator",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
        expertise: "AI & Machine Learning",
      },
      {
        name: "Dr. Ahmad Fauzi",
        role: "Co-Investigator",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
        expertise: "Plant Pathology",
      },
      {
        name: "Budi Santoso, M.Eng",
        role: "Research Assistant",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
        expertise: "Mobile Development",
      },
    ],
    funders: [
      {
        name: "PT. Tech Innovate",
        amount: 75000000,
        type: "Corporate",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
      },
      {
        name: "Innovation Fund Indonesia",
        amount: 50000000,
        type: "Government",
        logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop",
      },
      {
        name: "AgriTech Ventures",
        amount: 25000000,
        type: "VC",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop",
      },
    ],
    documents: [
      {
        title: "Research Proposal",
        type: "PDF",
        size: "2.4 MB",
        downloadUrl: "#",
      },
      {
        title: "Technical Specification",
        type: "PDF",
        size: "1.8 MB",
        downloadUrl: "#",
      },
      {
        title: "Dataset Sample",
        type: "ZIP",
        size: "45.2 MB",
        downloadUrl: "#",
      },
    ],
    updates: [
      {
        id: "1",
        title: "Model Training Progress Update",
        content:
          "Telah menyelesaikan training model CNN dengan akurasi 92% pada validation set. Sedang melakukan fine-tuning untuk meningkatkan performa.",
        date: "2024-03-15",
        author: "Dr. Sari Indrawati",
        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"],
      },
      {
        id: "2",
        title: "Partnership dengan Petani Lokal",
        content:
          "Berhasil menjalin kerjasama dengan 15 petani di Jawa Barat untuk uji coba sistem. Mereka akan membantu dalam pengumpulan data dan validasi hasil.",
        date: "2024-03-10",
        author: "Dr. Ahmad Fauzi",
        images: [],
      },
    ],
  },
  {
    id: "2",
    title: "Sistem Energi Terbarukan untuk Desa Terpencil",
    researcher: {
      name: "Prof. Dr. Bambang Wijaya",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      role: "Energy Systems Engineer",
      institution: "Universitas Gadjah Mada",
      reputation: 3200,
      publications: 45,
      experience: "15 tahun",
    },
    category: "Renewable Energy",
    description:
      "Mengembangkan sistem energi hibrid (solar-wind-micro hydro) yang dapat diandalkan untuk menyediakan listrik 24/7 di desa-desa terpencil Indonesia. Sistem ini dirancang untuk mudah dipelihara oleh masyarakat lokal.",
    fullDescription: `
      Proyek ini fokus pada pengembangan sistem energi terbarukan terintegrasi yang menggabungkan panel surya, turbin angin skala kecil, dan micro hydro untuk desa-desa terpencil di Indonesia. Sistem ini dirancang dengan pendekatan community-based maintenance.

      Komponen utama sistem:
      - Solar Panel Array dengan battery storage
      - Small Wind Turbines untuk angin lokal
      - Micro Hydro Generator untuk sungai kecil
      - Smart Grid Controller dengan AI optimization
      - Community Training Program untuk maintenance

      Target: Menyediakan listrik 24/7 untuk 500+ rumah dengan biaya operasional minimal dan keterlibatan masyarakat dalam pemeliharaan.
    `,
    funding: 280000000,
    targetFunding: 400000000,
    backers: 18,
    stage: "Pilot Testing",
    duration: "24 bulan",
    location: "Yogyakarta, Indonesia",
    rating: 4.9,
    views: 2100,
    tags: ["Renewable Energy", "Solar", "Wind", "Hydro", "Smart Grid", "Community"],
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop",
    ],
    milestones: [
      {
        title: "System Design & Component Selection",
        status: "completed",
        date: "2023-12-01",
        description: "Menyelesaikan desain sistem dan pemilihan komponen optimal",
      },
      {
        title: "Prototype Development",
        status: "completed",
        date: "2024-02-15",
        description: "Membangun prototype sistem di laboratorium",
      },
      {
        title: "Pilot Installation",
        status: "active",
        date: "2024-04-01",
        description: "Instalasi pilot di Desa Wukirsari, Yogyakarta",
      },
      {
        title: "Community Training Program",
        status: "pending",
        date: "2024-05-01",
        description: "Pelatihan masyarakat untuk maintenance sistem",
      },
      {
        title: "Performance Evaluation",
        status: "pending",
        date: "2024-08-01",
        description: "Evaluasi performa sistem selama 6 bulan",
      },
    ],
    team: [
      {
        name: "Prof. Dr. Bambang Wijaya",
        role: "Principal Investigator",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
        expertise: "Renewable Energy Systems",
      },
      {
        name: "Dr. Rina Sari",
        role: "Co-Investigator",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
        expertise: "Smart Grid Technology",
      },
      {
        name: "Agus Pratama, M.T",
        role: "Field Engineer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
        expertise: "Installation & Maintenance",
      },
    ],
    funders: [
      {
        name: "Ministry of Energy",
        amount: 150000000,
        type: "Government",
        logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop",
      },
      {
        name: "Green Energy Foundation",
        amount: 80000000,
        type: "Foundation",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
      },
      {
        name: "PT. Energi Nusantara",
        amount: 50000000,
        type: "Corporate",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop",
      },
    ],
    documents: [
      {
        title: "System Design Document",
        type: "PDF",
        size: "5.2 MB",
        downloadUrl: "#",
      },
      {
        title: "Environmental Impact Assessment",
        type: "PDF",
        size: "3.1 MB",
        downloadUrl: "#",
      },
      {
        title: "Community Engagement Plan",
        type: "PDF",
        size: "2.8 MB",
        downloadUrl: "#",
      },
    ],
    updates: [
      {
        id: "1",
        title: "Pilot Installation Completed",
        content:
          "Instalasi pilot di Desa Wukirsari telah selesai. Sistem berhasil menyuplai listrik untuk 50 rumah dengan efisiensi 87%. Masyarakat sangat antusias dengan program ini.",
        date: "2024-03-20",
        author: "Prof. Dr. Bambang Wijaya",
        images: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop"],
      },
    ],
  },
  {
    id: "3",
    title: "Teknologi Blockchain untuk Traceability Pangan",
    researcher: {
      name: "Dr. Maya Kusuma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      role: "Blockchain Developer",
      institution: "Universitas Indonesia",
      reputation: 1890,
      publications: 18,
      experience: "6 tahun",
    },
    category: "Blockchain Technology",
    description:
      "Mengembangkan platform blockchain untuk melacak perjalanan produk pangan dari petani hingga konsumen. Sistem ini akan meningkatkan transparansi, keamanan pangan, dan memberikan nilai tambah bagi petani.",
    fullDescription: `
      Platform blockchain ini dirancang untuk menciptakan sistem traceability yang transparan dan tidak dapat dimanipulasi untuk produk pangan Indonesia. Setiap tahap dalam supply chain akan tercatat secara permanen di blockchain.

      Fitur utama platform:
      - Smart Contracts untuk automated verification
      - QR Code integration untuk consumer access
      - IoT sensors untuk real-time monitoring
      - Mobile app untuk farmers dan distributors
      - Analytics dashboard untuk stakeholders
      - Integration dengan existing ERP systems

      Manfaat: Meningkatkan kepercayaan konsumen, mengurangi food fraud, memberikan premium price untuk produk berkualitas, dan memperkuat brand Indonesia di pasar global.
    `,
    funding: 120000000,
    targetFunding: 180000000,
    backers: 8,
    stage: "Development",
    duration: "15 bulan",
    location: "Jakarta, Indonesia",
    rating: 4.6,
    views: 890,
    tags: ["Blockchain", "Food Safety", "Supply Chain", "IoT", "Smart Contracts"],
    images: [
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    ],
    milestones: [
      {
        title: "Blockchain Architecture Design",
        status: "completed",
        date: "2024-01-01",
        description: "Merancang arsitektur blockchain dan smart contracts",
      },
      {
        title: "MVP Development",
        status: "active",
        date: "2024-03-15",
        description: "Mengembangkan Minimum Viable Product",
      },
      {
        title: "Pilot Testing with Farmers",
        status: "pending",
        date: "2024-05-01",
        description: "Uji coba dengan 20 petani di Jawa Barat",
      },
      {
        title: "Consumer App Launch",
        status: "pending",
        date: "2024-07-01",
        description: "Peluncuran aplikasi untuk konsumen",
      },
    ],
    team: [
      {
        name: "Dr. Maya Kusuma",
        role: "Principal Investigator",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
        expertise: "Blockchain Development",
      },
      {
        name: "Reza Pratama, M.Kom",
        role: "Smart Contract Developer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
        expertise: "Solidity & Web3",
      },
      {
        name: "Siti Aminah, M.T",
        role: "IoT Specialist",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
        expertise: "IoT & Sensors",
      },
    ],
    funders: [
      {
        name: "Digital Innovation Fund",
        amount: 70000000,
        type: "Government",
        logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop",
      },
      {
        name: "PT. Blockchain Indonesia",
        amount: 50000000,
        type: "Corporate",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
      },
    ],
    documents: [
      {
        title: "Blockchain Whitepaper",
        type: "PDF",
        size: "3.5 MB",
        downloadUrl: "#",
      },
      {
        title: "Smart Contract Specification",
        type: "PDF",
        size: "2.1 MB",
        downloadUrl: "#",
      },
    ],
    updates: [
      {
        id: "1",
        title: "Smart Contract Audit Completed",
        content:
          "Audit keamanan smart contract telah selesai dengan hasil memuaskan. Tidak ditemukan vulnerability kritis dan sistem siap untuk testing phase.",
        date: "2024-03-12",
        author: "Dr. Maya Kusuma",
        images: [],
      },
    ],
  },
  {
    id: "4",
    title: "Bioremediasi Limbah Plastik dengan Mikroorganisme",
    researcher: {
      name: "Dr. Indra Gunawan",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
      role: "Environmental Biotechnologist",
      institution: "Institut Teknologi Sepuluh Nopember",
      reputation: 2100,
      publications: 31,
      experience: "12 tahun",
    },
    category: "Environmental Science",
    description:
      "Mengembangkan konsorsium mikroorganisme yang dapat mendegradasi plastik PET dan polietilen secara efisien. Penelitian ini bertujuan mengatasi masalah sampah plastik dengan pendekatan biologis yang ramah lingkungan.",
    fullDescription: `
      Penelitian ini fokus pada isolasi dan optimasi mikroorganisme yang mampu mendegradasi plastik secara biologis. Kami menggunakan pendekatan metagenomics untuk mengidentifikasi enzim-enzim yang dapat memecah ikatan polimer plastik.

      Metodologi penelitian:
      - Isolasi mikroorganisme dari TPA dan lingkungan tercemar plastik
      - Screening aktivitas degradasi plastik
      - Optimasi kondisi kultivasi untuk maksimum degradasi
      - Scale-up ke bioreactor pilot
      - Analisis produk degradasi dan keamanan lingkungan
      - Pengembangan formulasi komersial

      Target: Mencapai degradasi 80% plastik PET dalam 30 hari dengan produk akhir yang aman untuk lingkungan.
    `,
    funding: 95000000,
    targetFunding: 150000000,
    backers: 15,
    stage: "Laboratory Testing",
    duration: "20 bulan",
    location: "Surabaya, Indonesia",
    rating: 4.7,
    views: 1450,
    tags: ["Biotechnology", "Environmental", "Plastic Waste", "Microorganisms", "Sustainability"],
    images: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop",
    ],
    milestones: [
      {
        title: "Microorganism Isolation & Screening",
        status: "completed",
        date: "2023-11-15",
        description: "Berhasil mengisolasi 50+ strain mikroorganisme kandidat",
      },
      {
        title: "Enzyme Characterization",
        status: "completed",
        date: "2024-01-30",
        description: "Karakterisasi enzim plastik-degrading dari 10 strain terbaik",
      },
      {
        title: "Optimization Studies",
        status: "active",
        date: "2024-04-15",
        description: "Optimasi kondisi kultivasi dan degradasi",
      },
      {
        title: "Pilot Scale Testing",
        status: "pending",
        date: "2024-06-01",
        description: "Uji coba skala pilot dengan bioreactor 100L",
      },
      {
        title: "Environmental Safety Assessment",
        status: "pending",
        date: "2024-08-15",
        description: "Evaluasi keamanan lingkungan produk degradasi",
      },
    ],
    team: [
      {
        name: "Dr. Indra Gunawan",
        role: "Principal Investigator",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
        expertise: "Environmental Biotechnology",
      },
      {
        name: "Dr. Lestari Wulandari",
        role: "Microbiologist",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
        expertise: "Microbial Ecology",
      },
      {
        name: "Ahmad Rizki, M.Si",
        role: "Research Assistant",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
        expertise: "Biochemical Analysis",
      },
    ],
    funders: [
      {
        name: "Environmental Research Grant",
        amount: 60000000,
        type: "Government",
        logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop",
      },
      {
        name: "Green Innovation Fund",
        amount: 35000000,
        type: "Foundation",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
      },
    ],
    documents: [
      {
        title: "Research Methodology",
        type: "PDF",
        size: "4.2 MB",
        downloadUrl: "#",
      },
      {
        title: "Preliminary Results",
        type: "PDF",
        size: "6.8 MB",
        downloadUrl: "#",
      },
      {
        title: "Environmental Impact Study",
        type: "PDF",
        size: "3.9 MB",
        downloadUrl: "#",
      },
    ],
    updates: [
      {
        id: "1",
        title: "Breakthrough in Enzyme Activity",
        content:
          "Kami berhasil meningkatkan aktivitas enzim PETase hingga 300% melalui protein engineering. Hasil ini sangat menjanjikan untuk aplikasi komersial.",
        date: "2024-03-18",
        author: "Dr. Indra Gunawan",
        images: ["https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop"],
      },
    ],
  },
  {
    id: "5",
    title: "Sistem Monitoring Kualitas Air Real-time dengan IoT",
    researcher: {
      name: "Dr. Fitri Handayani",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      role: "Environmental Engineer",
      institution: "Universitas Brawijaya",
      reputation: 1650,
      publications: 22,
      experience: "9 tahun",
    },
    category: "IoT & Environmental Monitoring",
    description:
      "Mengembangkan sistem monitoring kualitas air sungai dan danau secara real-time menggunakan sensor IoT dan machine learning untuk prediksi pencemaran. Sistem ini akan memberikan early warning kepada masyarakat dan pemerintah.",
    fullDescription: `
      Sistem monitoring ini mengintegrasikan sensor IoT multi-parameter untuk mengukur kualitas air secara kontinyu. Data yang dikumpulkan akan dianalisis menggunakan machine learning untuk prediksi tren pencemaran dan early warning system.

      Komponen sistem:
      - Multi-parameter water quality sensors (pH, DO, turbidity, conductivity, temperature)
      - LoRaWAN communication network
      - Edge computing untuk real-time processing
      - Cloud platform untuk data storage dan analytics
      - Mobile app untuk public access
      - Dashboard untuk government agencies
      - Machine learning models untuk prediction

      Impact: Memberikan informasi real-time kepada 1M+ penduduk tentang kualitas air, membantu pemerintah dalam pengambilan keputusan cepat, dan mencegah krisis kesehatan akibat air tercemar.
    `,
    funding: 85000000,
    targetFunding: 130000000,
    backers: 11,
    stage: "Prototype",
    duration: "16 bulan",
    location: "Malang, Indonesia",
    rating: 4.5,
    views: 780,
    tags: ["IoT", "Water Quality", "Environmental Monitoring", "Machine Learning", "Early Warning"],
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop",
    ],
    milestones: [
      {
        title: "Sensor Selection & Testing",
        status: "completed",
        date: "2024-01-10",
        description: "Pemilihan dan testing sensor kualitas air terbaik",
      },
      {
        title: "IoT Network Development",
        status: "active",
        date: "2024-03-20",
        description: "Pengembangan jaringan LoRaWAN dan edge computing",
      },
      {
        title: "ML Model Development",
        status: "pending",
        date: "2024-05-10",
        description: "Pengembangan model machine learning untuk prediksi",
      },
      {
        title: "Field Deployment",
        status: "pending",
        date: "2024-07-01",
        description: "Deployment sistem di 5 lokasi pilot",
      },
    ],
    team: [
      {
        name: "Dr. Fitri Handayani",
        role: "Principal Investigator",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
        expertise: "Environmental Engineering",
      },
      {
        name: "Andi Setiawan, M.T",
        role: "IoT Developer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
        expertise: "IoT & Embedded Systems",
      },
      {
        name: "Lisa Permata, M.Kom",
        role: "Data Scientist",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
        expertise: "Machine Learning",
      },
    ],
    funders: [
      {
        name: "Smart City Initiative",
        amount: 50000000,
        type: "Government",
        logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop",
      },
      {
        name: "PT. IoT Solutions",
        amount: 35000000,
        type: "Corporate",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
      },
    ],
    documents: [
      {
        title: "System Architecture",
        type: "PDF",
        size: "3.7 MB",
        downloadUrl: "#",
      },
      {
        title: "Sensor Calibration Report",
        type: "PDF",
        size: "2.4 MB",
        downloadUrl: "#",
      },
    ],
    updates: [
      {
        id: "1",
        title: "Successful Sensor Testing",
        content:
          "Testing sensor di laboratorium menunjukkan akurasi 98% untuk semua parameter. Sensor tahan terhadap kondisi lingkungan ekstrem dan memiliki battery life 2 tahun.",
        date: "2024-03-14",
        author: "Dr. Fitri Handayani",
        images: [],
      },
    ],
  },
]

export function getResearchById(id: string): ResearchProject | undefined {
  return researchProjects.find((research) => research.id === id)
}

export function getResearchByCategory(category: string): ResearchProject[] {
  return researchProjects.filter((research) => research.category === category)
}

export function getFeaturedResearch(): ResearchProject[] {
  return researchProjects.slice(0, 3)
}
