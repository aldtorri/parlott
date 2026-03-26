import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // Use webpack instead of Turbopack so @serwist/next works
  // Remove this when serwist adds Turbopack support
};

export default withSerwist(nextConfig);
