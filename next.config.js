/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['./*'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    remotePatterns: [
      {
          protocol: "https",
        hostname: "res.cloudinary.com",
        pathname:"/dfjejmpbr/image/upload/**"

      },
    ],
  },

  generateEtags: false,
};

module.exports = nextConfig;
