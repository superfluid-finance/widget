/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@superfluid-finance/widget"],
  reactStrictMode: true,
  output: "export",
};

module.exports = nextConfig;
