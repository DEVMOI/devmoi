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

  const { visibility, page, title, sections } = req.body;
  // const pagethumbnail = req.file;

  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log('Validation error in updatePages fucntion:', err.array());
      return res.status(422).json({ errors: err.array() });
    }

    // let file_visibility, imageID;

    // pagethumbnail !== undefined && fileId === undefined
    //   ? (imageID = pagethumbnail.id)
    //   : (imageID = ObjectID.isValid(fileId))
    //   ? ObjectID(fileId)
    //   : null;

    if (typeof visibility !== 'boolean' && visibility === 'false') {
      file_visibility = false;
    } else if (typeof visibility !== 'boolean' && visibility === 'visible') {
      file_visibility = true;
    } else if (typeof visibility !== 'boolean' && visibility === 'true') {
      file_visibility = true;
    } else {
      file_visibility = false;
    }

    await pages.updateOne(
      { page: page },
      {
        $set: {
          page: page,
          title: title,
          visibility: file_visibility,
          sections: sections,
          // thumbnail: imageID,
        },
        $currentDate: { lastModified: true },
      },
      { upsert: true },
      (err, doc) => {
        if (err) {
          console.log('error updating pages article', err);
          pagethumbnail !== undefined && fileId === undefined
            ? (deleteThumbnail(pagethumbnail.id),
              console.log(`Event with short-title: ${title} was not updated`))
            : console.log('no file was uploaded - if');

          return res.status(400).json({
            errors: [
              { msg: `Event with short-title: ${title} was not updated` },
            ],
          });
        } else {
          res.json({
            page_data: {
              page: doc.page,
              visibility: doc.visibility,
              title: doc.title,
              sections: doc.sections,
            },
          });
        }
      }
    );
  } catch (err) {
    pagethumbnail !== undefined && fileId === undefined
      ? (deleteThumbnail(pagethumbnail.id),
        console.log(`pages with short-title: ${title} was not updated`))
      : console.log('no file was uploaded - catch', err);
    console.error(err.message);
    res.status(500).json('server error');
  }
};
