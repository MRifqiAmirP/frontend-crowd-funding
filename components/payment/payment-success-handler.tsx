"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Tetap diimpor jika ada kebutuhan lain, tapi tidak digunakan untuk redirect otomatis
import { toast } from "@/components/ui/use-toast";

interface PaymentSuccessHandlerProps {
  orderId: string;
  projectId: string;
}

export default function PaymentSuccessHandler({
  orderId,
  projectId,
}: PaymentSuccessHandlerProps) {
  const router = useRouter(); // Tidak perlu useRouter jika tidak ada redirect otomatis

  useEffect(() => {
    // Tampilkan pesan sukses hanya sekali saat komponen dimuat
    toast({
      title: "Pembayaran Berhasil! 🎉",
      description:
        "Terima kasih atas dukungan Anda. Dana akan segera diproses.",
    });

    // Hapus logika setTimeout dan router.push di sini.
    // Pengguna akan tetap di halaman ini setelah pesan sukses muncul.
    // Mereka dapat kembali ke halaman proyek secara manual.

    // router.replace(`/projects/${projectId}`); // Redirect ke halaman proyek setelah sukses pembayaran
  }, [orderId, projectId]); // orderId dan projectId tetap sebagai dependensi jika Anda ingin toast spesifik

  // Komponen ini tidak perlu merender apapun secara visual,
  // karena tujuannya hanya untuk memicu toast.
  return null;
}
