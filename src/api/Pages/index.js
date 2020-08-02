const { check, validationResult } = require('express-validator');
const updatePage = require('./updatePage');
const getPage = require('./getPage');

const deleteThumbnail = require('../apiUtils/manageThumbnails');
const getDB = require('../../db').getDB;

module.exports = (router, app, upload) => {
  const db = getDB();
  /**
   * @method POST
   * @route /api/news/addNews
   * @description add a new article
   */
  router.post(
    '/api/pages/updatePage',
    upload.single('pagethumbnail'),
    async (req, res) => {
      try {
        updatePage(req, res);
      } catch (error) {
        deleteThumbnail(req.file.id),
          console.log('/api/pages/updatePage - ', error);
      }
    }
  );

  /**
   * @method GET
   * @route /api/news/addNews
   * @description add a new article
   */
  router.get('/api/pages/getPage/:page', async (req, res) => {
    try {
      getPage(req, res);
    } catch (error) {
      console.log('/api/pages/getPage - ', error);
    }
  });
};
