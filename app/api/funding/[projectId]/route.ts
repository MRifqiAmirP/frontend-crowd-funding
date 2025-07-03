import { type NextRequest, NextResponse } from "next/server"
import { getProjectFunding, getProjectDonations } from "@/lib/donation-storage"

export async function GET(request: NextRequest, { params }: { params: { projectId: string } }) {
  try {
    const projectId = params.projectId

    const funding = getProjectFunding(projectId)
    const donations = getProjectDonations(projectId)

    if (!funding) {
      return NextResponse.json({
        projectId,
        currentFunding: 0,
        targetFunding: 5000000,
        backers: 0,
        donations: [],
        lastUpdated: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      ...funding,
      donations: donations.map((d) => ({
        id: d.id,
        amount: d.amount,
        donorName: d.isAnonymous ? "Anonim" : d.donorName,
        createdAt: d.completedAt || d.createdAt,
        rewardId: d.rewardId,
      })),
    })
  } catch (error) {
    console.error("Error fetching project funding:", error)
    return NextResponse.json({ error: "Failed to fetch project funding" }, { status: 500 })
  }
}
