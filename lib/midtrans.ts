// Midtrans configuration with correct sandbox credentials
export const MIDTRANS_CONFIG = {
  merchantId: "G608490974",
  serverKey: process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-l60XBF1AqmewU_VKX8b_OUdX",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-0S-pMOQojtvkM-gZ",
  // Sandbox environment
  isProduction: false,
  apiUrl: "https://api.sandbox.midtrans.com/v2",
  snapUrl: "https://app.sandbox.midtrans.com/snap/snap.js",
  snapApiUrl: "https://app.sandbox.midtrans.com/snap/v1/transactions",
}

export interface PaymentRequest {
  orderId: string
  amount: number
  customerDetails: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  itemDetails: {
    id: string
    price: number
    quantity: number
    name: string
  }[]
  projectId: string
  rewardId?: string
}

export interface PaymentResponse {
  token: string
  redirectUrl: string
}

export interface PaymentNotification {
  orderId: string
  transactionStatus: string
  transactionId: string
  grossAmount: string
  paymentType: string
  transactionTime: string
  fraudStatus?: string
  statusCode: string
  signatureKey: string
}

// Generate unique order ID with merchant prefix
export function generateOrderId(projectId: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `PS-${projectId}-${timestamp}-${random}`
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Calculate platform fee (3% of donation + Rp 2,500 fixed fee)
export function calculatePlatformFee(amount: number): number {
  const percentageFee = Math.round(amount * 0.03)
  const fixedFee = 2500
  return percentageFee + fixedFee
}

// Calculate net amount after platform fee
export function calculateNetAmount(amount: number): number {
  return amount - calculatePlatformFee(amount)
}

// Payment status mapping
export const PAYMENT_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  PARTIAL_REFUND: "partial_refund",
  EXPIRED: "expired",
} as const

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS]

// Midtrans transaction status mapping
export function mapMidtransStatus(status: string): PaymentStatus {
  switch (status) {
    case "capture":
    case "settlement":
      return PAYMENT_STATUS.SUCCESS
    case "pending":
      return PAYMENT_STATUS.PENDING
    case "deny":
    case "cancel":
      return PAYMENT_STATUS.CANCELLED
    case "expire":
      return PAYMENT_STATUS.EXPIRED
    case "failure":
      return PAYMENT_STATUS.FAILED
    case "refund":
      return PAYMENT_STATUS.REFUNDED
    case "partial_refund":
      return PAYMENT_STATUS.PARTIAL_REFUND
    default:
      return PAYMENT_STATUS.PENDING
  }
}

// Verify Midtrans signature for webhook security
export function verifySignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string,
  signatureKey: string,
): boolean {
  const crypto = require("crypto")
  const hash = crypto
    .createHash("sha512")
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest("hex")

  return hash === signatureKey
}

// Test credentials for sandbox
export const SANDBOX_TEST_DATA = {
  creditCard: {
    number: "4811 1111 1111 1114",
    cvv: "123",
    expiry: "12/25",
    name: "Test User",
  },
  gopay: {
    phone: "081234567890",
  },
  bankTransfer: {
    bca: "Virtual Account akan di-generate",
    mandiri: "Kode bayar akan di-generate",
    bni: "Virtual Account akan di-generate",
  },
}
