module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.pexels.com',
      'www.youtube.com'
    ]
  },
  ...(process.env.APPLICATION_MODE === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
}