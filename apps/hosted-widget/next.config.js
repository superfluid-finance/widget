/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://superfluid-widget-builder.vercel.app",
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
