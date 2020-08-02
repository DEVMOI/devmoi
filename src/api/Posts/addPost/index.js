const { check, validationResult } = require('express-validator');
const Post = require('../../../models/Post');

/**
 * @route add post
 */

module.exports = async (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(422).json({ errors: err.array() });
  }

  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      image: req.body.image,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};
