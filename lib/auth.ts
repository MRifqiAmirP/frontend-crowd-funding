export interface User {
  id: string
  email: string
  name: string
  role: "student" | "mentor" | "donor"
  avatar?: string
  profile?: {
    school?: string
    major?: string
    expertise?: string[]
    location?: string
    bio?: string
    verified?: boolean
  }
}

export const mockUsers: Record<string, { password: string; user: User }> = {
  "pelajar@gmail.com": {
    password: "pelajar1234",
    user: {
      id: "1",
      email: "pelajar@gmail.com",
      name: "Ahmad Rizki Pratama",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      profile: {
        school: "Universitas Indonesia",
        major: "Teknik Informatika",
        location: "Jakarta",
        bio: "Mahasiswa semester 6 yang passionate di bidang teknologi dan startup. Sedang mengembangkan aplikasi mobile untuk membantu UMKM.",
        verified: true,
      },
    },
  },
  "mentor@gmail.com": {
    password: "mentor1234",
    user: {
      id: "2",
      email: "mentor@gmail.com",
      name: "Dr. Sarah Wijaya",
      role: "mentor",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      profile: {
        expertise: ["Business Strategy", "Digital Marketing", "Product Development"],
        location: "Bandung",
        bio: "Entrepreneur berpengalaman 15+ tahun. Telah membantu 200+ startup berkembang. Fokus pada mentoring bisnis digital dan strategi go-to-market.",
        verified: true,
      },
    },
  },
  "donatur@gmail.com": {
    password: "donatur1234",
    user: {
      id: "3",
      email: "donatur@gmail.com",
      name: "Budi Santoso",
      role: "donor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      profile: {
        location: "Surabaya",
        bio: "Angel investor dan filantropis yang peduli dengan pengembangan kewirausahaan muda Indonesia. Telah mendanai 50+ proyek pelajar.",
        verified: true,
      },
    },
  },
}

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const userRecord = mockUsers[email]
  if (userRecord && userRecord.password === password) {
    return userRecord.user
  }

  return null
}
