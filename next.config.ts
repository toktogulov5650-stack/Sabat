import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static assets are already compressed; keeping runtime optimization off
  // also makes local Vinext development independent of Cloudflare Images.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
