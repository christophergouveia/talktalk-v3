import MillionLint from '@million/lint';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/chat/:path*',
        destination: '/pt-BR/conversar/:path*',
        permanent: true,
      },
      {
        source: '/room/:path*',
        destination: '/pt-BR/conversar/:path*',
        permanent: true,
      },
    ];
  },

  compress: true,

  trailingSlash: false,

  generateBuildId: async () => {
    return 'talktalk-v1.0.0';
  },
};

export default MillionLint.next({
  enabled: false,
  rsc: false,
})(nextConfig);
