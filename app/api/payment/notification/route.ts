import { type NextRequest, NextResponse } from "next/server"
import { verifySignature, mapMidtransStatus, MIDTRANS_CONFIG } from "@/lib/midtrans"
import { updateDonationStatus } from "@/lib/donation-storage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      order_id: orderId,
      transaction_status: transactionStatus,
      transaction_id: transactionId,
      gross_amount: grossAmount,
      payment_type: paymentType,
      transaction_time: transactionTime,
      fraud_status: fraudStatus,
      status_code: statusCode,
      signature_key: signatureKey,
    } = body

    console.log("Received Midtrans notification:", {
      orderId,
      transactionStatus,
      statusCode,
      paymentType,
    })

    // Verify signature for security
    const isValidSignature = verifySignature(orderId, statusCode, grossAmount, MIDTRANS_CONFIG.serverKey, signatureKey)

    if (!isValidSignature) {
      console.error("Invalid signature for order:", orderId)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Map Midtrans status to our internal status
    const paymentStatus = mapMidtransStatus(transactionStatus)

    // Update donation status
    const updated = updateDonationStatus(
      orderId,
      paymentStatus,
      paymentStatus === "success" ? new Date().toISOString() : undefined,
    )

    if (!updated) {
      console.error("Donation not found for order:", orderId)
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    console.log("Updated donation status:", { orderId, status: paymentStatus })

    // In production, you might want to:
    // 1. Send email notifications
    // 2. Update project statistics
    // 3. Trigger webhooks to other services
    // 4. Log to analytics

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment notification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
