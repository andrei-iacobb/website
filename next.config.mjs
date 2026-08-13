const isDevelopment = process.env.NODE_ENV === 'development'

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "manifest-src 'self'",
  `connect-src 'self'${isDevelopment ? ' ws: wss:' : ''}`,
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/js/p.js',
        destination: 'https://plausible.iacob.co.uk/js/script.js',
      },
      {
        source: '/api/p',
        destination: 'https://plausible.iacob.co.uk/api/event',
      },
    ]
  },
  // Enable standalone output for Docker optimization
  output: 'standalone',
  // Enable image optimization for faster loading
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
  },
  // Enable compression
  compress: true,
  // Inline the page's CSS into the HTML instead of a render-blocking
  // stylesheet request (Next built-in; replaces the critters-based
  // optimizeCss, which was not eliminating the blocking chunk).
  experimental: {
    exposeTestingApiInProductionBuild:
      process.env.EXPOSE_TESTING_API === '1',
    inlineCss: true,
    turbopackRustReactCompiler: true,
    useOffline: true,
  },
  turbopack: {},
  // Disable X-Powered-By header to avoid exposing server technology
  poweredByHeader: false,
  // Enable React strict mode for development warnings
  reactStrictMode: true,
  // Security and caching headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
        ],
      },
    ]
  },
}

export default nextConfig
