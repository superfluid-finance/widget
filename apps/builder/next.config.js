/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["superfluid-checkout-widget"],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
};
