/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: process.env.ROOT_REDIRECT_URL ?? "https://www.superfluid.finance/subscriptions",
        permanent: false,
      },
    ];
  },

  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
  transpilePackages: ["@superfluid-finance/widget"],
};
