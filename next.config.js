const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

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
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
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
    ];
  },
};

module.exports = nextConfig;
