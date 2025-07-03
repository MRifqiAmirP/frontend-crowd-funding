import { type NextRequest, NextResponse } from "next/server"
import { generateOrderId, calculatePlatformFee } from "@/lib/midtrans"
import { addDonation } from "@/lib/donation-storage"

// Midtrans Sandbox Configuration
const MIDTRANS_CONFIG = {
  merchantId: "G608490974",
  serverKey: process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-l60XBF1AqmewU_VKX8b_OUdX",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-0S-pMOQojtvkM-gZ",
  snapApiUrl: "https://app.sandbox.midtrans.com/snap/v1/transactions",
  isProduction: false,
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, amount, customerDetails, rewardId } = body

    // Debug logging for credentials
    console.log("Midtrans Configuration:", {
      merchantId: MIDTRANS_CONFIG.merchantId,
      serverKeyExists: !!MIDTRANS_CONFIG.serverKey,
      serverKeyPrefix: MIDTRANS_CONFIG.serverKey?.substring(0, 10) + "...",
      clientKeyExists: !!MIDTRANS_CONFIG.clientKey,
      clientKeyPrefix: MIDTRANS_CONFIG.clientKey?.substring(0, 10) + "...",
      endpoint: MIDTRANS_CONFIG.snapApiUrl,
    })

    // Enhanced validation
    if (!projectId || !amount || !customerDetails) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "projectId, amount, and customerDetails are required",
        },
        { status: 400 },
      )
    }

    if (amount < 10000) {
      return NextResponse.json(
        {
          error: "Minimum donation amount is Rp 10,000",
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!customerDetails.email || !emailRegex.test(customerDetails.email)) {
      return NextResponse.json(
        {
          error: "Valid email is required",
        },
        { status: 400 },
      )
    }

    // Validate required customer details
    if (!customerDetails.firstName) {
      return NextResponse.json(
        {
          error: "First name is required",
        },
        { status: 400 },
      )
    }

    // Generate unique order ID and calculate fees
    const orderId = generateOrderId(projectId)
    const platformFee = calculatePlatformFee(amount)
    const totalAmount = amount + platformFee

    // Store donation record immediately as pending
    const donation = addDonation({
      orderId,
      projectId,
      amount,
      donorName: `${customerDetails.firstName} ${customerDetails.lastName || ""}`.trim(),
      donorEmail: customerDetails.email,
      isAnonymous: customerDetails.anonymous || false,
      rewardId,
      status: "pending",
      paymentMethod: "midtrans_snap",
      createdAt: new Date().toISOString(),
    })

    // Prepare Midtrans Snap transaction data
    const transactionData = {
      transaction_details: {
        order_id: orderId,
        gross_amount: totalAmount,
      },
      customer_details: {
        first_name: customerDetails.firstName,
        last_name: customerDetails.lastName || "",
        email: customerDetails.email,
        phone: customerDetails.phone || "",
      },
      item_details: [
        {
          id: `donation-${projectId}`,
          price: amount,
          quantity: 1,
          name: `Donasi Proyek #${projectId}`,
          category: "donation",
        },
        {
          id: "platform-fee",
          price: platformFee,
          quantity: 1,
          name: "Biaya Platform ProyekSiswa.id",
          category: "fee",
        },
      ],
      credit_card: {
        secure: true,
        save_card: false,
      },
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/success?order_id=${orderId}`,
        error: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/failed?order_id=${orderId}`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/pending?order_id=${orderId}`,
      },
      expiry: {
        start_time: new Date().toISOString().replace(/\.\d{3}Z$/, " +0700"),
        unit: "minutes",
        duration: 60,
      },
      custom_field1: `project_${projectId}`,
      custom_field2: rewardId || "no_reward",
      custom_field3: "proyeksiswa_donation",
    }

    // Create proper authorization header
    const authString = `${MIDTRANS_CONFIG.serverKey}:`
    const authHeader = `Basic ${Buffer.from(authString).toString("base64")}`

    console.log("Creating Midtrans transaction:", {
      orderId,
      amount: totalAmount,
      authHeaderLength: authHeader.length,
      serverKeyLength: MIDTRANS_CONFIG.serverKey?.length,
      endpoint: MIDTRANS_CONFIG.snapApiUrl,
    })

    // Create transaction with Midtrans Snap API
    const response = await fetch(MIDTRANS_CONFIG.snapApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
        Accept: "application/json",
      },
      body: JSON.stringify(transactionData),
    })

    const responseText = await response.text()

    // Enhanced logging
    console.log("Midtrans API Response:", {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "content-type": response.headers.get("content-type"),
        "content-length": response.headers.get("content-length"),
      },
      bodyLength: responseText.length,
      bodyPreview: responseText.substring(0, 500),
    })

    // Parse response
    let result
    try {
      result = JSON.parse(responseText)
    } catch (parseError) {
      console.error("Failed to parse Midtrans response:", parseError)
      return NextResponse.json(
        {
          error: "Invalid response from payment gateway",
          details: "Failed to parse response",
          debug: {
            status: response.status,
            responsePreview: responseText.substring(0, 200),
          },
        },
        { status: 502 },
      )
    }

    if (!response.ok) {
      console.error("Midtrans API error:", result)

      // Extract error message
      let errorMessage = "Failed to create payment"
      if (result.error_messages) {
        errorMessage = Array.isArray(result.error_messages) ? result.error_messages.join(", ") : result.error_messages
      } else if (result.message) {
        errorMessage = result.message
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: result,
          debug: {
            orderId,
            serverKeyExists: !!MIDTRANS_CONFIG.serverKey,
            serverKeyPrefix: MIDTRANS_CONFIG.serverKey?.substring(0, 10) + "...",
            authHeaderLength: authHeader.length,
            status: response.status,
            endpoint: MIDTRANS_CONFIG.snapApiUrl,
          },
        },
        { status: response.status },
      )
    }

    // Validate successful response
    if (!result.token) {
      console.error("No token in Midtrans response:", result)
      return NextResponse.json(
        {
          error: "Invalid payment token received",
          details: "Payment gateway did not return a valid token",
        },
        { status: 502 },
      )
    }

    // Success response
    return NextResponse.json({
      success: true,
      orderId,
      token: result.token,
      redirectUrl: result.redirect_url,
      donationId: donation.id,
      amount: totalAmount,
      platformFee,
      debug: {
        hasToken: !!result.token,
        hasRedirectUrl: !!result.redirect_url,
        environment: "sandbox",
        merchantId: MIDTRANS_CONFIG.merchantId,
      },
    })
  } catch (error) {
    console.error("Payment creation error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
