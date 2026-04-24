/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ["http://192.168.18.7:8081"], // Expo dev server
  },
};

module.exports = nextConfig;
