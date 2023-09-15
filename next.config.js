/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
});

const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    externalApiUrl: "https://gateway.ipehr.org/v1/",
    ehrSystemId: "sc_bsn_si",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = withPWA(nextConfig);
