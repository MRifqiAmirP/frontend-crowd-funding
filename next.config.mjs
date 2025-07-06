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
  async rewrites() {
    return [
      {
        source: '/error-404/:path*',
        destination: '/500', // Arahkan ke halaman kosong (bukan /404)
      },
      {
        source: '/error-pages/:path*',
        destination: '/500', // Blokir akses ke halaman 401/503
      }
    ]
  },
  generateBuildId: async () => 'build-' + Date.now(),
}

export default nextConfig
