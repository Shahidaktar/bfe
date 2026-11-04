import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/plan-my-journey", destination: "/enquiry", permanent: true },
      { source: "/api/plan-my-journey", destination: "/api/enquiry", permanent: true },
    ];
  },
};

export default nextConfig;
