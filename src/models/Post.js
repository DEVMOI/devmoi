const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @model Post
 * @description title, thumbnailImage, description, category, postDate, location, resourceType, people: [name], contributors: [name], discipline, tags, references
 */

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  thumbnailImage: {
    type: Schema.Types.ObjectId,
    ref: 'media',
  },

  description: {
    type: String,
  },

  catergory: {
    type: String,
  },

  postDate: {
    type: Date,
    default: Date.now,
  },

  location: {
    type: String,
  },

  resourceType: {
    type: String,
  },

  people: [
    {
      name: {
        type: String,
      },
    },
  ],

  contributors: [
    {
      name: {
        type: String,
      },
    },
  ],

  discipline: {
    type: String,
  },

  tags: [
    {
      type: String,
    },
  ],

  references: [{ type: String }],

  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
});

const Post = mongoose.models.post || mongoose.model('post', postSchema);
module.exports = Post;
