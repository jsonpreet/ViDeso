/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: process.env.NODE_ENV === 'production',
  experimental: {
    scrollRestoration: true,
    newNextLinkBehavior: true
  },
  async rewrites() {
    return [
      {
        source: '/@:channel',
        destination: '/:channel'
      },
      {
        source: '/@:channel/tab',
        destination: '/:channel/tab'
      }
    ]
  },
  images: {
    minimumCacheTTL: 360,
    deviceSizes: [96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = moduleExports
