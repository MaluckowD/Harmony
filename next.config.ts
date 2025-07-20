// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'slow-tools-shine.loca.lt',
        port: '',
        pathname: '/albumImages/**',
      },
    ],
  },
}