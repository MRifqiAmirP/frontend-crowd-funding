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
            value: 'Apache'
          }
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/error-404/:path*',
        destination: '/404',
      }
    ]
  }
}

export default nextConfig
