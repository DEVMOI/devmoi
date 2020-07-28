const nodemailer = require('nodemailer');
//const logger = require('../../util/logger');

var sendEmail = async (msg) => {
  const transporter = nodemailer.createTransport({
    //host: 'smtp.office365.com',
    host: 'smtp.ethereal.email',
    port: 587,
    //tls: true,

    secureConnection: false,
    auth: {
      // Service Account Information
      // user: process.env.SERVICE_ACC_EMAIL,
      // pass: process.env.SERVICE_ACC_PASS,

      // Ethereal Information
      user: 'alayna.little96@ethereal.email',
      pass: 'me4fY4R99nh2k1xtN4',
    },
  });

  return transporter.sendMail(msg);
};

module.exports = sendEmail;
