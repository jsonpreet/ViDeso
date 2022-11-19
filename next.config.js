/** @type {import('next').NextConfig} */
const { withAxiom } = require('next-axiom')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const moduleExports = withBundleAnalyzer(
  withAxiom({
    reactStrictMode: process.env.NODE_ENV === 'production',
    experimental: {
      scrollRestoration: true,
      newNextLinkBehavior: true
    }
  })
)

module.exports = moduleExports


// const nextConfig = {
//   reactStrictMode: false,
//   swcMinify: true,
//   experimental: {
//     scrollRestoration: true
//   },
//   resolve: {
//     extensions: ['.jsx', '.js', '.json', '.wasm'],
//   },
//   images: {
//     minimumCacheTTL: 360,
//     deviceSizes: [96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],
//   },
// }

// module.exports = nextConfig
