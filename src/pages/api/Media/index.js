const express = require('express');
const { check, validationResult } = require('express-validator');

// Load Models
const Media = require('../../models/Media');

// Load Route Functions
const addMedia = require('./addMedia');
const removeMedia = require('./removeMedia');
const getMedia = require('./getMedia');
// const updateMedia = require('./updateMedia');

module.exports = (router, app) => {
  // @route    GET api/media
  // @desc     Test Media Route
  // @access   Public
  router.get('/api/media/test', (req, res) => {
    res.json({ msg: 'Media Routes Reached' });
  });

  // @route   GET api/media
  // @desc    Get Media Items Route
  // @access  Public
  router.get('/api/media', (req, res) => {
    getMedia(req, res);
  });

  // @route    POST api/media
  // @desc     Add Media Route
  // @access   Public
  router.post('/api/media', (req, res) => {
    // Determine filter to select on
    let filter = '';
    // Utilize addMedia function and pass in correct filter
    addMedia(req, res, filter);

    // res.json({ msg: 'Media Added' });
  });

  // @route POST api/media
  // @desc Remove Media
  // @access Public
  router.post('/api/media/remove', (req, res) => {
    //Utilize removeMedia function
    removeMedia(req, res);

    // res.json({ msg: 'Media Removed' });
  });
};
