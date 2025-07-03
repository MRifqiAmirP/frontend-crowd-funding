import PaymentSuccessHandler from "@/components/payment/payment-success-handler"

interface SearchParams {
  [key: string]: string | string[] | undefined
}

interface Props {
  searchParams: SearchParams
}

export default function PaymentSuccessPage({ searchParams }: Props) {
  const orderId = searchParams.get("order_id")
  const projectId = searchParams.get("project_id") || "1" // fallback

  return (
    <div>
      {orderId && <PaymentSuccessHandler orderId={orderId} projectId={projectId} />}
      <h1>Payment Successful</h1>
      <p>Thank you for your order!</p>
    </div>
  )
}
