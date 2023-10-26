/** @type {import('next').NextConfig} */
const nextConfig = {  images: {
    domains: ['res.cloudinary.com']
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mongoose: {
      uri: process.env.MONGO_URI ,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  },
  headers: () => [
    {
      source: '/api/getAll',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],

}

module.exports = nextConfig
