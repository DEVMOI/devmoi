const nextConfig = {
  /* config options here */
  target: 'serverless',
  devIndicators: {
    autoPrerender: true,
  },
  webpackDevMiddleware: (config) => {
    // Solve compiling problem via vagrant
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // delay before rebuilding
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/dashboard/:path*',
        destination: '/Dashboard/:path*',
      },
      {
        source: '/:path*/Settings',
        destination: '/:path*/settings',
      },
      {
        source: '/Live',
        destination: '/live',
      },
      {
        source: '/Live/:path*',
        destination: '/live/:path*',
      },
      {
        source: '/Minecraft',
        destination: '/minecraft',
      },
      {
        source: '/Swap',
        destination: '/swap',
      },
      {
        source: '/Wallet',
        destination: '/wallet',
      },
      {
        source: '/About',
        destination: '/about',
      },
    ];
  },
  env: {
    ADMIN_ID: process.env.ADMIN_ID,
    INFURA_API: process.env.INFURA_API,
    SPACES:process.env.SPACES
  },
};

module.exports = nextConfig;
