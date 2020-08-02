const { validationResult } = require('express-validator');
const Invitation = require('../../../models/Invitation');
const sendEmail = require('../../../helpers/sendEmail');
const encryptData = require('../../../helpers/encryptData');

module.exports = async (req, res) => {
  const { email, role, senderId } = req.body;

  // Establish Date
  const date = Date.now();

  try {
    let invite = await Invitation.findOne({ recipientEmail: email });

    if (invite) {
      res.json({
        sent: false,
        message: 'User already Invited',
      });
    } else {
      const expDate = new Date();
      // set expiry date
      expDate.setDate(
        expDate.getDate() + parseInt(process.env.INVITATION_EXPIRY)
      );

      const expiryDate = (expDate.getTime() / 1000).toString();
      const url = `${req.headers.host}/auth/ve/${encryptData(
        {
          email: email,
          role: role,
          expiryDate: expiryDate,
        },
        process.env.SECRETKEY
      )}`;

      const msg = {
        to: email,
        //from: process.env.SERVICE_ACC_EMAIL,
        from: 'ethereal.email',
        subject: `Please confirm your role as an ${role} for CCTSJR Dashboard`,
        html: `<style>
                  .text-rap {
                    word-break:break-word;
                    white-space: normal;
                  }
                </style>
                <p>
                You are being contacted regarding your new role as a dashboard ${role} for the Cooperative Consortium for Transdisciplinary Social Justice at the University of Louisville. 
                You will need to set up an account in the database with your university email and a unique password. Please set up your role in the dashboard by clicking on the link below or copy and paste it in a browser to proceed.
                <a class='text-rap' href="${url}">${url}</a>
                <p/>`,
      };

      const email_status = await sendEmail(msg);

      if (email_status.accepted.includes(email)) {
        const getSenderId = senderId ? senderId : null;
        invite = new Invitation({
          recipientEmail: email,
          senderID: getSenderId,
          status: 'Sent',
          sendDate: date,
        });
        await invite.save();
        res.json({ sent: true, message: 'Email Sent Successfully' });
      } else {
        //logger.error(email_status);
        //console.log(email_status);
      }
    }
  } catch (err) {
    //logger.error(err);
    console.log(err);
    res.status(500).send(err);
  }
};
