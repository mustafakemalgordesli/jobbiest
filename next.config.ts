import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pvpl0nwmhbnfmbd2.public.blob.vercel-storage.com',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
  }
};

export default nextConfig;
