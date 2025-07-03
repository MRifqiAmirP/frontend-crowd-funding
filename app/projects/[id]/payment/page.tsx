"use client"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/page-transition"
import DonationFormEnhanced from "@/components/payment/donation-form-enhanced"
import EscrowSystem from "@/components/payment/escrow-system"
import RealTimeFunding from "@/components/real-time-funding"
import { featuredProjects } from "@/lib/dummy-data"

export default function ProjectPaymentPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const project = featuredProjects.find((p) => p.id === params.id) || featuredProjects[0]

  // Get pre-selected amount and reward from URL params
  const preSelectedAmount = searchParams.get("amount")
  const preSelectedReward = searchParams.get("reward")

  const rewards = [
    {
      id: "1",
      title: "Supporter",
      amount: 50000,
      description: "Ucapan terima kasih di media sosial dan newsletter kami",
      backers: 15,
      estimatedDelivery: "Januari 2024",
      available: true,
    },
    {
      id: "2",
      title: "Early Bird",
      amount: 100000,
      description: "1 produk edisi khusus + ucapan terima kasih di media sosial",
      backers: 20,
      estimatedDelivery: "Februari 2024",
      available: true,
    },
    {
      id: "3",
      title: "Premium Bundle",
      amount: 250000,
      description: "3 produk edisi khusus + nama Anda di website kami sebagai pendukung",
      backers: 7,
      estimatedDelivery: "Februari 2024",
      available: true,
    },
    {
      id: "4",
      title: "VIP Package",
      amount: 500000,
      description: "Semua reward sebelumnya + meeting eksklusif dengan tim",
      backers: 2,
      estimatedDelivery: "Maret 2024",
      available: false,
    },
  ]

  const handlePaymentSuccess = (orderId: string) => {
    // Redirect to success page with project info
    window.location.href = `/payment/success?order_id=${orderId}&project_id=${project.id}`
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href={`/projects/${project.id}`} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Proyek
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DonationFormEnhanced
              projectId={project.id}
              projectTitle={project.title}
              rewards={rewards}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Real-time Funding Display */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Progress Pendanaan</h3>
              <RealTimeFunding projectId={project.id} showRecentDonations={true} compact={false} />
            </div>

            {/* Escrow System */}
            <EscrowSystem
              projectId={project.id}
              targetAmount={project.targetFunding}
              currentAmount={project.currentFunding}
              deadline="2024-01-31T23:59:59Z"
              status="active"
            />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
