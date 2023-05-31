/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@superfluid-finance/widget"],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
  env: {
    NEXT_PUBLIC_GOOGLE_FONTS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY,
  },
};
