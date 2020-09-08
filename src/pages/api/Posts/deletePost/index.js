const { check, validationResult } = require('express-validator');
const Post = require('../../../models/Post');

/**
 * @route delete post
 */

module.exports = async (req, res) => {
  if (!err.isEmpty()) {
    return res.status(422).json({ errors: err.array() });
  }

  try {
    const post = await Post.findById(req.params.id);

    // check if post exists

    if (!post) {
      return res.status(404).json({
        message: 'post has not been found',
      });
    }

    await post.remove();

    res.json({
      message: 'post has been removed',
    });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        message: 'post has not been found',
      });
    }

    res.status(500).send('server error');
  }
};
