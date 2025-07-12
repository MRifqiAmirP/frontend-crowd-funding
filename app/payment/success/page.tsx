import PaymentSuccessHandler from "@/components/payment/payment-success-handler";
import Link from "next/link"; // Import Link
import { Button } from "@/components/ui/button"; // Import Button

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface Props {
  searchParams: SearchParams;
}

export default function PaymentSuccessPage({ searchParams }: Props) {
  const orderId = searchParams["order_id"] as string | undefined;
  const projectId = searchParams["project_id"] as string | undefined;

  return (
    <div className="container mx-auto px-4 py-8 text-center min-h-screen flex flex-col justify-center items-center">
      {orderId && projectId && (
        <PaymentSuccessHandler orderId={orderId} projectId={projectId} />
      )}

      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Pembayaran Berhasil! 🎉
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Terima kasih banyak atas donasi Anda untuk proyek ini.
        </p>
        {orderId && (
          <p className="text-sm text-gray-500 mb-8">
            ID Pesanan Anda:{" "}
            <span className="font-medium text-gray-800">{orderId}</span>
          </p>
        )}

        {projectId ? (
          <Link href={`/projects/${projectId}`} passHref>
            <Button className="w-full">Kembali ke Halaman Proyek</Button>
          </Link>
        ) : (
          <Link href="/projects" passHref>
            <Button className="w-full">Jelajahi Proyek Lain</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
