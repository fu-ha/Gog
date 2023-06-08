/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
      // domains: ['e5eb-18-183-169-161.ngrok.io'],
      // domains: [process.env.NEXT_IMAGE_DOMAIN],
      // domains: ['geem84.work'],
      domains: ['s3.ap-northeast-1.amazonaws.com']
    },
  //   env: {
  //     NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  //     API_PORT: 3000,
　　// 　CONTAINER_PORT: 80,
　　// 　FRONT_PORT: 80,
　　// 　API_URL: "https://geem84.work",
　　// 　FRONT_DOMAIN: "geem84.com",
  //   },
}

module.exports = nextConfig
