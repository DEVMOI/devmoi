const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @model Invitation
 * @description recipientEmail, senderID, status, projectID, sendDate
 */

const invitationSchema = new Schema({
  recipientEmail: {
    type: String,
    required: true,
    unique: true,
  },

  senderID: {
    type: Schema.Types.ObjectId,
    ref: 'auth',
    required: true,
  },

  status: {
    type: String,
    enum: ['Sent', 'Accepted', 'Declined'],
    required: true,
  },

  // projectID: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'project',
  // },

  sendDate: {
    type: Date,
    default: Date.now,
  },
});

const Invitation =
  mongoose.models.invitation || mongoose.model('invitation', invitationSchema);
module.exports = Invitation;
