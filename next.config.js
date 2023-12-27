/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,

  eslint: {
    dirs: ['./*'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    remotePatterns: [
      {
          protocol: "https",
        hostname: "res.cloudinary.com",
        pathname:"/**"

      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname:"/**"
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname:"/**"
      }
      
    ],
  },

  generateEtags: false,
};

module.exports = nextConfig;
