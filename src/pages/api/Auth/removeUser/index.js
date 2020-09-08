const { check, validationResult } = require('express-validator');
const Auth = require('../../../models/Auth');

module.exports = async (req, res) => {
  try {
    const delUser = await Auth.findByIdAndRemove(req.params.id);

    // If no user found, throw error
    if (!delUser) {
      throw 'User Not Found';
    } else {
      res.json({ msg: delUser });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
