const { validationResult } = require('express-validator');
const Invitation = require('../../../models/Invitation');
const sendEmail = require('../../../helpers/sendEmail');
const encryptData = require('../../../helpers/encryptData');

module.exports = async (req, res) => {
  const { email } = req.body;

  // Establish Date
  const date = Date.now();

  try {
    // Establish 24 Hour Expiration Date
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + parseInt(process.env.RESET_EXPIRY));
    const expiryDate = (expDate.getTime() / 1000).toString();

    // Establish Reset Link
    const url = `${req.headers.host}/auth/validate-reset/${encryptData(
      {
        email: email,
        expiryDate: expiryDate,
      },
      process.env.SECRETKEY
    )}`;

    const msg = {
      to: email,
      //from: process.env.SERVICE_ACC_EMAIL,
      from: 'ethereal.email',
      subject: `CCTSJR Dashboard Password Reset Link`,
      html: `<style>
                  .text-rap {
                    word-break:break-word;
                    white-space: normal;
                  }
                </style>
                <p>
                A request has been submitted to reset your password for your Cooperative Consoritum Dashboard account. 
                <br /> To reset your password, plase click the link below:
                <a class='text-rap' href="${url}">${url}</a>
                <br />
                If you did not submit this request, please disregard this email.
                <p/>`,
    };

    // Use Send Email Helper function
    const email_status = await sendEmail(msg);

    if (email_status.accepted.includes(email)) {
      res.json({
        success: true,
        message: 'Reset Password Email Sent Successfully',
      });
    } else {
      //logger.error(email_status);
      //console.log(email_status);
    }
    //}
  } catch (err) {
    //logger.error(err);
    console.log(err);
    res.status(500).send(err);
  }
};
