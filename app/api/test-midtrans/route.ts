import { NextResponse } from "next/server"

// Test endpoint to verify Midtrans credentials
export async function GET() {
  const serverKey = process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-l60XBF1AqmewU_VKX8b_OUdX"
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-0S-pMOQojtvkM-gZ"

  // Test simple API call to verify credentials
  const authString = `${serverKey}:`
  const authHeader = `Basic ${Buffer.from(authString).toString("base64")}`

  try {
    // Test with a simple ping to Midtrans API
    const testOrderId = `TEST-${Date.now()}`
    const testData = {
      transaction_details: {
        order_id: testOrderId,
        gross_amount: 10000,
      },
      customer_details: {
        first_name: "Test",
        last_name: "User",
        email: "test@example.com",
        phone: "081234567890",
      },
      item_details: [
        {
          id: "test-item",
          price: 10000,
          quantity: 1,
          name: "Test Item",
        },
      ],
    }

    const response = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
        Accept: "application/json",
      },
      body: JSON.stringify(testData),
    })

    const responseText = await response.text()
    let result

    try {
      result = JSON.parse(responseText)
    } catch (e) {
      result = { raw: responseText }
    }

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      serverKeyExists: !!serverKey,
      serverKeyPrefix: serverKey?.substring(0, 15) + "...",
      clientKeyExists: !!clientKey,
      clientKeyPrefix: clientKey?.substring(0, 15) + "...",
      authHeaderLength: authHeader.length,
      response: result,
      success: response.ok,
    })
  } catch (error) {
    return NextResponse.json({
      error: "Test failed",
      details: error instanceof Error ? error.message : "Unknown error",
      serverKeyExists: !!serverKey,
      clientKeyExists: !!clientKey,
    })
  }
}
