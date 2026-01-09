import type { NextConfig } from 'next';

/**
 * @docs
 * - https://scotthelme.co.uk/content-security-policy-an-introduction/
 * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
 */
const contentSecurityPolicy = `
  default-src 'self' *.sznm.dev *.agustinusnathaniel.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' umami.sznm.dev cdn.vercel-insights.com vercel.live *.sznm.dev *.agustinusnathaniel.com;
  frame-src vercel.live www.youtube.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/ *.sznm.dev *.agustinusnathaniel.com;
  img-src * blob: data: *.freepik.com;
  media-src 'none';
  connect-src *;
  font-src 'self' https://fonts.gstatic.com/ *.sznm.dev *.agustinusnathaniel.com;
`;

/**
 * @docs
 * - https://nextjs.org/docs/app/guides/content-security-policy
 * - https://nextjs.org/docs/pages/api-reference/config/next-config-js/headers#options
 */
const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'geolocation=()',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typedRoutes: true,
  /**
   * @docs
   * - https://nextjs.org/docs/app/guides/content-security-policy#without-nonces
   */
  headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
