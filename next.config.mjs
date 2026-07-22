/** @type {import('next').NextConfig} */
const nextConfig = {
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
    minimumCacheTTL: 2678400,
    minimumCacheTTL: 31536000, // 1 year
  },
  // Enable compression
  compress: true,
  // Inline the page's CSS into the HTML instead of a render-blocking
  // stylesheet request (Next built-in; replaces the critters-based
  // optimizeCss, which was not eliminating the blocking chunk).
  experimental: {
    inlineCss: true,
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
            value: 'origin-when-cross-origin',
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
            value: "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'",
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
