import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb';

import middleware from '../../../middleware';

import createUserProfile from '../../../helpers/createUserProfile';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    await createUserProfile(req, res).then(() => {
      res.json({ message: 'posted' });
    });
  } catch (error) {
    console.log('POST "api/survey" =>', error);
  }
});

export default (req, res) => handler.apply(req, res);
