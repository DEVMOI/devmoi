const crypto = require('crypto');

/**
 * @function encryptData
 * @description Creates a AES Cipher based on incoming data and a secret key, encrypts data
 * @param {any} Data
 * @param {string} secretkey
 */

module.exports = (data, secretKey) => {
  if (secretKey) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(secretKey, 'salt', 32);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  throw new Error('To Encrpyt Data Please Add Secret Key');
};
