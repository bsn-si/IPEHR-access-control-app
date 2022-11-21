/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    externalApiUrl: "https://gateway.ipehr.org/v1/",
  },
};

module.exports = nextConfig;
