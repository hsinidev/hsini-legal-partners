import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
