/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@superfluid-finance/widget"],
  reactStrictMode: true,
  output: "export",
  env: {
    NEXT_PUBLIC_THE_THING: process.env.NEXT_PUBLIC_THE_THING,
  },
};

module.exports = nextConfig;
