const decryptData = require('../../../helpers/decryptData');

module.exports = (req, res) => {
  let resetHash = req.params;
  resetHash = resetHash.resetHash;

  console.log(resetHash);

  const decryptedHash = decryptData(resetHash, process.env.SECRETKEY);
  return decryptedHash;
};
