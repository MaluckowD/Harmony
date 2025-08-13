module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '185.185.70.48',
        port: '8081',
        pathname: '/albumImages/**',
      },
      {
        protocol: 'http',
        hostname: '185.185.70.48',
        port: '8081',
        pathname: '/songImages/**',
      },
      {
        protocol: 'http',
        hostname: '185.185.70.48',
        port: '8081',
        pathname: '/artistImages/**',
      },
    ],
  },
}