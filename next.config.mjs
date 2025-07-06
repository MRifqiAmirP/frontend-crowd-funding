/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // --- Tambahkan bagian ini untuk rewrites (proxy) ---
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Ketika frontend memanggil URL yang diawali dengan /api/
        destination: 'http://backend.damonprinsa.cloud/:path*', // Proxy permintaan tersebut ke URL backend Anda
      },
    ]
  },
  // --- Akhir bagian rewrites ---
}

export default nextConfig
