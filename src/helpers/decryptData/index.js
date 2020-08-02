const crypto = require('crypto');

/**
 * @function decryptData
 * @description Creates a AES Cipher based on incoming data and a secret key, decrypts data
 * @param {any} Data
 * @param {string} secretkey
 */

module.exports = (data, secretKey) => {
  if (secretKey) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(secretKey, 'salt', 32);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  }
  throw new Error('To Encrpyt Data Please Add Secret Key');
};
