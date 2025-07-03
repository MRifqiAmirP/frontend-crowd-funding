// Simulated database for donations - In production, use real database
interface Donation {
  id: string
  orderId: string
  projectId: string
  amount: number
  donorName: string
  donorEmail: string
  isAnonymous: boolean
  rewardId?: string
  status: "pending" | "success" | "failed"
  paymentMethod: string
  createdAt: string
  completedAt?: string
}

interface ProjectFunding {
  projectId: string
  currentFunding: number
  targetFunding: number
  backers: number
  lastUpdated: string
}

// In-memory storage (replace with real database in production)
const donations: Donation[] = [
  {
    id: "don-001",
    orderId: "PS-1-1703123456-ABC123",
    projectId: "1",
    amount: 100000,
    donorName: "Ahmad Rizki",
    donorEmail: "ahmad@example.com",
    isAnonymous: false,
    rewardId: "2",
    status: "success",
    paymentMethod: "gopay",
    createdAt: "2024-01-15T10:30:00Z",
    completedAt: "2024-01-15T10:31:00Z",
  },
  {
    id: "don-002",
    orderId: "PS-1-1703123457-DEF456",
    projectId: "1",
    amount: 250000,
    donorName: "Siti Nurhaliza",
    donorEmail: "siti@example.com",
    isAnonymous: false,
    rewardId: "3",
    status: "success",
    paymentMethod: "bank_transfer",
    createdAt: "2024-01-15T11:15:00Z",
    completedAt: "2024-01-15T11:18:00Z",
  },
  {
    id: "don-003",
    orderId: "PS-2-1703123458-GHI789",
    projectId: "2",
    amount: 150000,
    donorName: "Budi Santoso",
    donorEmail: "budi@example.com",
    isAnonymous: true,
    rewardId: "2",
    status: "success",
    paymentMethod: "credit_card",
    createdAt: "2024-01-15T12:00:00Z",
    completedAt: "2024-01-15T12:02:00Z",
  },
]

const projectFunding: ProjectFunding[] = [
  {
    projectId: "1",
    currentFunding: 350000,
    targetFunding: 5000000,
    backers: 2,
    lastUpdated: "2024-01-15T11:18:00Z",
  },
  {
    projectId: "2",
    currentFunding: 150000,
    targetFunding: 3000000,
    backers: 1,
    lastUpdated: "2024-01-15T12:02:00Z",
  },
  {
    projectId: "3",
    currentFunding: 0,
    targetFunding: 2000000,
    backers: 0,
    lastUpdated: "2024-01-15T00:00:00Z",
  },
]

// Donation management functions
export function addDonation(donation: Omit<Donation, "id">): Donation {
  const newDonation: Donation = {
    ...donation,
    id: `don-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
  }

  donations.push(newDonation)

  // Update project funding if donation is successful
  if (donation.status === "success") {
    updateProjectFunding(donation.projectId, donation.amount)
  }

  return newDonation
}

export function updateDonationStatus(orderId: string, status: Donation["status"], completedAt?: string): boolean {
  const donationIndex = donations.findIndex((d) => d.orderId === orderId)

  if (donationIndex === -1) return false

  const donation = donations[donationIndex]
  donation.status = status

  if (completedAt) {
    donation.completedAt = completedAt
  }

  // Update project funding if donation becomes successful
  if (status === "success" && donation.status !== "success") {
    updateProjectFunding(donation.projectId, donation.amount)
  }

  donations[donationIndex] = donation
  return true
}

export function updateProjectFunding(projectId: string, additionalAmount: number): void {
  const fundingIndex = projectFunding.findIndex((f) => f.projectId === projectId)

  if (fundingIndex === -1) {
    // Create new funding record
    projectFunding.push({
      projectId,
      currentFunding: additionalAmount,
      targetFunding: 5000000, // Default target
      backers: 1,
      lastUpdated: new Date().toISOString(),
    })
  } else {
    // Update existing funding
    projectFunding[fundingIndex].currentFunding += additionalAmount
    projectFunding[fundingIndex].backers += 1
    projectFunding[fundingIndex].lastUpdated = new Date().toISOString()
  }
}

export function getProjectFunding(projectId: string): ProjectFunding | null {
  return projectFunding.find((f) => f.projectId === projectId) || null
}

export function getAllProjectFunding(): ProjectFunding[] {
  return [...projectFunding]
}

export function getProjectDonations(projectId: string): Donation[] {
  return donations.filter((d) => d.projectId === projectId && d.status === "success")
}

export function getDonationByOrderId(orderId: string): Donation | null {
  return donations.find((d) => d.orderId === orderId) || null
}

export function getRecentDonations(limit = 10): Donation[] {
  return donations
    .filter((d) => d.status === "success")
    .sort((a, b) => new Date(b.completedAt || b.createdAt).getTime() - new Date(a.completedAt || a.createdAt).getTime())
    .slice(0, limit)
}

// Statistics functions
export function getTotalFundingStats() {
  const totalFunding = projectFunding.reduce((sum, pf) => sum + pf.currentFunding, 0)
  const totalBackers = projectFunding.reduce((sum, pf) => sum + pf.backers, 0)
  const totalProjects = projectFunding.length
  const successfulDonations = donations.filter((d) => d.status === "success").length

  return {
    totalFunding,
    totalBackers,
    totalProjects,
    successfulDonations,
  }
}
