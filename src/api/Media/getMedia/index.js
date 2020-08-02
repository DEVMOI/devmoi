const { validationResult } = require('express-validator');
const getDB = require('../../../db').getDB;
const ObjectID = require('mongodb').ObjectID
const { getFileUrl } = require('../../apiUtils/manageThumbnails')

module.exports = async (req, res, filter) => {
  const db = getDB(),
    file = db.collection('fileStore.files'),
    fileChunks = db.collection('fileStore.chunks');
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(422).json({ errors: err.array() });
  }

  try {
    let allFiles = [];

    for await (const mediaFile of file.find({})) {
      /* get file url */
      if (mediaFile._id !== null && ObjectID.isValid(mediaFile._id)) {
        async function getUrl() {
          const imgUrl = await getFileUrl(mediaFile._id);
          mediaFile['imgurl'] = imgUrl;
        }
        await getUrl();
      } else {
        mediaFile['imgurl'] = null;
      }
      allFiles.push(mediaFile);
      }
    setTimeout(() => {
      res.json({ mediaFiles: allFiles });
    }, 300);
  } catch (err) {
    // logger.error(`Error getting all projects: ${err.message}`);
    console.log(`Error -> getMedia ->: ${err}`);
    res.status(500).json({ message: `server error: ${err.message}` });
  }
};
