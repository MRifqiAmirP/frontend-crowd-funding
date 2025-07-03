import { type NextRequest, NextResponse } from "next/server"
import { MIDTRANS_CONFIG } from "@/lib/midtrans"

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params

    // Check payment status with Midtrans
    const response = await fetch(`${MIDTRANS_CONFIG.apiUrl}/${orderId}/status`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(MIDTRANS_CONFIG.serverKey + ":").toString("base64")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch payment status")
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("Payment status check error:", error)
    return NextResponse.json({ error: "Failed to check payment status" }, { status: 500 })
  }
}
