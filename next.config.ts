import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Korea_Lotto',
  assetPrefix: '/Korea_Lotto',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
