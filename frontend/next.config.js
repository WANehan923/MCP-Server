/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_MCP_SERVER_URL: process.env.NEXT_PUBLIC_MCP_SERVER_URL,
  },
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;