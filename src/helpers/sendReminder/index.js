// require('dotenv').config();
// // Importing models
// // const Project = require('../models/Project');
// const TestTaker = require('../../models/TestTaker');
// const Invitation = require('../../models/Invitation');

// // Importing Logger
// const cron = require('node-cron');
// const logger = require('../../utils/logger');
// const sendEmail = require('../sendEmail');
// const encryptData = require('../encryptData');

// var sendReminder = async () => {
//   for await (const invite of Invitation.find({
//     status: 'Sent',
//     projectID: { $ne: null },
//   })) {
//     let tt = await TestTaker.findOne({ email: invite.recipientEmail });
//     if (tt) {
//       await Invitation.deleteOne({ recipientEmail: tt.email });
//     } else {
//       var expDate = new Date();
//       // create expiry date based on set number of days
//       expDate.setDate(expDate.getDate() + process.env.REMINDERS);
//       // convert date to seconds and make string
//       var expiryDate = (expDate.getTime() / 1000).toString();
//       let email = invite.recipientEmail;
//       let port = parseInt(process.env.PORT);
//       // TODO: url should not have localhost in server
//       const url = `http://localhost:${port}/project/ve/${encryptData(
//         {
//           email: email,
//           project: invite.projectID,
//           expiryDate: expiryDate,
//         },
//         process.env.SECRETKEY
//       )}`;
//       let msg = {
//         to: email,
//         from: process.env.SERVICE_ACC_EMAIL,
//         subject: 'Reminder Email',
//         html: `
//                 <p>This email is to remind that you have ${process.env.REMINDERS} days to deadline,
//                 to participate in Motivational Interviewing Training and Assessment. Please click on the link below or copy and paste it in a browser to proceed.
//                 <a href="${url}">${url}</a><p/>
//               `,
//       };
//       const email_status = await sendEmail(msg);
//       if (email_status.accepted.includes(email)) {
//         logger.info(`Email reminder sent to: ${email_status.accepted}`);
//         invite.status = 'Resent';
//         await invite.save();
//       } else {
//         logger.error(
//           `Sending email reminder to ${email_status.rejected} failed`
//         );
//       }
//     }
//   }
// };

// module.exports = sendReminder;
