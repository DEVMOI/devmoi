const { validationResult } = require('express-validator');
const getDB = require('../../../db').getDB;

module.exports = async (req, res) => {
  const db = getDB(),
    auths = db.collection('auths'),
    err = validationResult(req);
  try {
    if (!err.isEmpty()) {
      return res.status(422).json({ errors: err.array() });
    }
    let users = await auths.find().toArray();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};
