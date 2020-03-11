// next.config.js
const withOffline = require("next-offline");
const nextConfig = {
  /* config options here */
  devIndicators: {
    autoPrerender: true
  }
};
module.exports = withOffline(nextConfig);
