/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  transpilePackages: ["@superfluid-finance/widget"],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
};
