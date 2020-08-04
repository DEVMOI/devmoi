const http = require('http');
require('dotenv').config();
require('@babel/polyfill');
const { join } = require('path');
const { parse } = require('url');
const cacheableResponse = require('cacheable-response');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const GridFStorage = require('multer-gridfs-storage');
const cors = require('cors');
const next = require('next');
const bcrypt = require('bcryptjs');
const mongoConn = require('./src/db');

// Import Models
const authSchema = require('./src/models/Auth');
const pagesSchema = require('./src/models/Pages');

let app;
const PORT = parseInt(process.env.PORT, 10) || 3000;

mongoConn.connectDB(async (err) => {
  // TODO: this should be handled by the logger
  if (err) throw err;

  const db = mongoConn.getDB(),
    _db = mongoConn.getConnDB(),
    auths = db.collection('auths'),
    pages = db.collection('pages'),
    // create an index on n sorting chunks
    storage = new GridFStorage({
      db,
      file: (req, file) => {
        return {
          bucketName: 'fileStore',
          filename: file.originalname,
          metadata: {
            featured: file.fieldname,
            fileEncoding: file.encoding,
          },
        };
      },
    });

  const upload = multer({ storage });

  auths.createIndex({ email: 1 }, { unique: true }, { background: true });
  await db.command({
    collMod: 'auths',
    validator: authSchema,
    validationLevel: 'strict',
    validationAction: 'error',
  });

  pages.createIndex({ page: 1, title: 1 });
  await db.command({
    collMod: 'pages',
    validator: pagesSchema,
    validationLevel: 'off',
    // validationAction: 'error',
  });

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    let admin_user_password = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      salt
    );

    const query = { email: process.env.ADMIN_EMAIL };
    const update = {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: admin_user_password,
      role: [process.env.ADMIN_ROLE],
      active: true,
      permissions: null,
      dateCreated: new Date(),
      profileID: null,
    };
    const options = { upsert: true };

    await auths
      .updateOne(query, { $set: update }, options)
      .then((result) => {
        const { matchedCount, modifiedCount, upsertedId } = result;
        if ((matchedCount && modifiedCount) || upsertedId) {
          console.log(`Successfully added a new admin user.`);
        }
      })
      .catch((err) => console.error(`Failed to add admin user: ${err}`));
  } catch (e) {
    console.log('/app/index.js -> error creating admin user ->:', e);
    throw e;
  }

  // Server code anywhere above here inside connectDB()
  const ssrCache = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({ req, res, pagePath, queryParams }) => ({
      data: await app.renderToHTML(req, res, pagePath, queryParams),
    }),
    send: ({ data, res }) => res.send(data),
  });

  const dev = process.env.NODE_ENV !== 'production';
  app = next({ dev });
  const handle = app.getRequestHandler();
  // let server = express();
  // server.use(cors({ origin: 'localhost:7878' }));
  app.prepare().then(() => {
    // server.use(bodyParser.json());
    // server.use(bodyParser.urlencoded({ extended: true }));
    // server.use(upload.any());

    // Routes to use
    // require('./src/api/Auth')(server, app);
    // require('./src/api/Media')(server, app);
    // require('./src/api/Pages')(server, app, upload);

    // cors.js
    var server;
    server = http.createServer(function (req, res) {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      res.setHeader('Access-Control-Allow-Headers', '*');
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      // handle GET request to /service-worker.js

      if (pathname === '/') {
        async (req, res) => await ssrCache({ req, res, pagePath: '/' });
      }

      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname);
        console.log('PWA');
        app.serveStatic(req, res, filePath);
      } else {
        handle(req, res, parsedUrl);
      }
    });
    // ...
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  });
});
