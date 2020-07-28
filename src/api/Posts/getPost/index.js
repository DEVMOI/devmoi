const { check, validationResult } = require('express-validator');
const Post = require('../../../models/Post');

/**
 * @route get post
 */

module.exports = async (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(422).json({ errors: err.array() });
  }

  try {
    let post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};
