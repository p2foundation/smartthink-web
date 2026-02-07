import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },

  // Experimental features — enable as supported by your Next.js 16 version
  // reactCompiler and other features may require additional packages
  experimental: {},
};

export default nextConfig;
