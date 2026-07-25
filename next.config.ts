import type { NextConfig } from "next";
import path from "node:path";

// Set BASE_PATH="/repo-name" only when deploying to a GitHub project page
// (e.g. neybarao.github.io/natalialabbate). Leave empty for user pages
// (natalialabbate.github.io) or a custom domain via CNAME.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
