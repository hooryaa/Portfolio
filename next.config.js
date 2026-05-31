/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true,
  },
  // Transpile GSAP for ESM compatibility
  transpilePackages: ['gsap'],
}

module.exports = nextConfig
