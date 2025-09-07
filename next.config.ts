import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/b44/:path*',
        destination: `${process.env.BASE44_API_BASE}/:path*`, // ← 백틱(`) 유지!
      },
    ];
  },
};

export default nextConfig;

