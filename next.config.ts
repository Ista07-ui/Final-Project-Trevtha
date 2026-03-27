import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "travel-journal-api-bootcamp.do.dibimbing.id",
      },
      {
        protocol: "https",
        hostname: "**.tiket.photos",
      },
      {
        protocol: "https",
        hostname: "image.idntimes.com",
      },
      {
        protocol: "https",
        hostname: "travelspromo.com",
      },
      {
        protocol: "https",
        hostname: "**.com",
      },
      {
        protocol: "https",
        hostname: "**.co.id",
      },
    ],
  },
};

export default nextConfig;
