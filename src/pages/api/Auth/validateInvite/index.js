const decryptData = require('../../../helpers/decryptData');

module.exports = (req, res) => {
  let inviteHash = req.params;
  inviteHash = inviteHash.inviteHash;
  const decryptedHash = decryptData(inviteHash, process.env.SECRETKEY);
  return decryptedHash;
};
