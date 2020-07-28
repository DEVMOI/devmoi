'use strict';

const { createLogger, format, transports } = require('winston');
require('winston-mongodb');
require('winston-mail');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'Log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'results.log');

const logger = createLogger({
  level: env === 'production' || 'staging' ? 'info' : 'debug',
  format: format.combine(
    format.label({ label: path.dirname(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  transports: [
    // logging to console
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          info =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        )
      ),
    }),
    // logging to file
    new transports.File({
      filename,
      format: format.combine(
        format.printf(
          error =>
            `${error.timestamp} ${error.level} [${error.label}]: ${error.message}`
        )
      ),
    }),
    // logging to db
    new transports.MongoDB({
      db: process.env.dockerMongoURI,
      collection: 'infoLog',
      level: 'info',
    }),
    // logging to email
    new transports.Mail({
      to: process.env.MAINTENANCE_MAIL,
      from: process.env.SERVICE_ACC_EMAIL,
      host: 'smtp.office365.com',
      username: process.env.SERVICE_ACC_EMAIL,
      password: process.env.SERVICE_ACC_PASS,
      port: 587,
      tls: true,
      subject: `WASEVASE Error Notification`,
      level: 'info',
    }),
  ],
});

module.exports = logger;
