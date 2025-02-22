import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["assets.aceternity.com"], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'private-user-images.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },

    ],
    
  },
};

export default nextConfig;
