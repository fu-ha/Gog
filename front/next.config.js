/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
      // domains: ['e5eb-18-183-169-161.ngrok.io'],
      // domains: [process.env.NEXT_IMAGE_DOMAIN],
      domains: ['geem84.work'],
    },
    staticPageGenerationTimeout: 300,
}

module.exports = nextConfig
