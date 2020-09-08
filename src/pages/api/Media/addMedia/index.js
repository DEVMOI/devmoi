const { validationResult } = require('express-validator');
const Media = require('../../../models/Media');

module.exports = async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(422).json({ errors: err.array() });
    }

    const {
      mediaTitle,
      mediaType,
      mediaLocation,
      tags,
      credits,
      captions,
      altText,
      transcript,
      uploadDate,
      author,
    } = req.body,
      date = new Date(Date.now());

    // Create object to add
    media = new Media({
      mediaTitle: mediaTitle,
      mediaType: mediaType,
      mediaLocation: mediaLocation,
      tags: tags,
      metadata: {
        credits: credits,
        captions: captions,
        altText: altText,
        transcript: transcript,
        uploadDate: uploadDate || date,
        author: author,
        status: 'pending',
      },
    });

    // Save media item with pending status
    await media.save();
  } catch (error) {
    console.log('Error');
    throw error;
  }
};
