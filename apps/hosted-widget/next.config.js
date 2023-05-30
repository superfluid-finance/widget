/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
  transpilePackages: ["@superfluid-finance/widget"],
};
