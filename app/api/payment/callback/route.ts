import { type NextRequest, NextResponse } from "next/server"
import { verifySignature, mapMidtransStatus, MIDTRANS_CONFIG } from "@/lib/midtrans"
import { updateDonationStatus } from "@/lib/donation-storage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Payment callback received:", body)

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

    // Verify signature
    const isValidSignature = verifySignature(orderId, statusCode, grossAmount, MIDTRANS_CONFIG.serverKey, signatureKey)

    if (!isValidSignature) {
      console.error("Invalid signature for order:", orderId)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Map Midtrans status to our status
    const status = mapMidtransStatus(transactionStatus)

    // Update donation status
    const updatedDonation = updateDonationStatus(orderId, {
      status,
      transactionId,
      paymentMethod: paymentType,
      completedAt: status === "success" ? new Date().toISOString() : undefined,
      failedAt: status === "failed" ? new Date().toISOString() : undefined,
    })

    if (!updatedDonation) {
      console.error("Donation not found for order:", orderId)
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    console.log("Donation status updated:", {
      orderId,
      status,
      transactionId,
      paymentType,
    })

    // Here you could add additional logic like:
    // - Send email notifications
    // - Update project funding amount
    // - Trigger webhooks to other systems
    // - Log analytics events

    return NextResponse.json({
      success: true,
      message: "Payment status updated successfully",
      orderId,
      status,
    })
  } catch (error) {
    console.error("Payment callback error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Handle GET requests (for testing)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Payment callback endpoint is working",
    timestamp: new Date().toISOString(),
    environment: MIDTRANS_CONFIG.isProduction ? "production" : "sandbox",
  })
}
