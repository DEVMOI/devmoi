const { validationResult } = require('express-validator');
const getDB = require('../../../db').getDB;
const deleteThumbnail = require('../../apiUtils/manageThumbnails');
const { ObjectID } = require('mongodb');
/**
 * @route add news articless
 */

module.exports = async (req, res) => {
  const db = getDB(),
    pages = db.collection('pages');
  try {
    pages.findOne({ page: req.params.page }, (err, doc) => {
      if (err) {
        console.log('error updating events article', err);
      } else {
        res.json(doc);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};
