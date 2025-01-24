import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/quiz_repo',
  images: {
    unoptimized: true
  }
};

