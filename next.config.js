/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    externalApiUrl: "https://gateway.ipehr.org/v1/",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
