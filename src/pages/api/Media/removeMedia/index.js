const { check, validationResult } = require('express-validator');
const Media = require('../../../models/Media');

module.exports = async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.body.id, () => {
      console.log('Deleteing ID:', req.body.id, '<-');
    });

    res.json({ msg: 'Deleted Media Item' });
  } catch (error) {
    console.log('Error');
    throw error;
  }
};
