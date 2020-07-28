const cacheableResponse = require('cacheable-response');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
module.exports = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams),
  }),
  send: ({ data, res }) => res.send(data),
});
