import type { NextConfig } from 'next';
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  setupDevPlatform();
}

const nextConfig: NextConfig = {
  // Required for Cloudflare Pages compatibility
  output: 'standalone',
  
  // Dangerously allow production builds to successfully complete even if
  // your project has ESLint errors.
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Dangerously allow production builds to successfully complete even if
  // your project has TypeScript errors.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;