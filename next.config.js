/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    rollbarClientToken: 'e7ed8349613446db885be0acdb638f72',
  },
}

module.exports = nextConfig
