const getDB = require('../../../db').getDB;
const ObjectID = require('mongodb').ObjectID;

const db = getDB(),
  file = db.collection('fileStore.files'),
  fileChunks = db.collection('fileStore.chunks');

module.exports = {
  deleteThumbnail: async (file_id) => {
    try {
      if (ObjectID.isValid(file_id)) {
        await fileChunks.deleteMany({ files_id: file_id });
        await file.deleteOne({ _id: file_id });
        return 'file deleted';
      } else {
        return 'invalid _id';
      }
    } catch (err) {
      console.error('deleteThumbnail function - ', err.message);
      return 'deleteThumbnail function - ', err.message;
    }
  },

  getFileUrl: async (file_id) => {
    try {
      let imageUrl;
      if (ObjectID.isValid(file_id)) {
        let getFile = await file.findOne({ _id: ObjectID(file_id) });
        if (getFile) {
          let file_chunks = await fileChunks
            .find({ files_id: getFile._id })
            .sort({ n: 1 })
            .toArray();
          if (!file_chunks || file_chunks.length < 1) {
            // TODO: return appropriate error
            res.status(500).json({ response: 'No data found' });
          } else {
            let fileData = [];
            for (let i = 0; i < file_chunks.length; i++) {
              fileData.push(file_chunks[i].data.toString('base64'));
            }
            //Display the chunks using the data URI format
            imageUrl =
              'data:' + getFile.contentType + ';base64,' + fileData.join('');
          }
        }
        return imageUrl;
      } else {
        return 'invalid _id';
      }
    } catch (err) {
      console.error('getFileUrl function - ', err.message);
      return 'getFileUrl function - ', err.message;
    }
  },
};
