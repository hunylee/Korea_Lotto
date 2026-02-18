import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Assuming repository name is 'Korea_Lotto'. 
  // If deploying to hunylee.github.io directly, remove basePath.
  // Ideally this should be dynamic or user-configurable.
  // For now, let's assume it's a project site.
  // basePath: '/Korea_Lotto', 
  // actually, let's keep it simple first and assume root or user handles basePath via env
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
