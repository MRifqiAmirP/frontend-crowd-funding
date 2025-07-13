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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Custom-404-Handler',
            value: 'Apache',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Ketika frontend memanggil URL yang diawali dengan /api/
        destination: 'http://backend.damonprinsa.cloud/:path*', // Proxy permintaan tersebut ke URL backend Anda
      },
      {
        source: '/error-404/:path*',
        destination: '/404',
      },
    ]
  },
}

export default nextConfig
