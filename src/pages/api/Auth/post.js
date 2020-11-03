import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb';

import middleware from '../../../middleware';

// import createUserProfile from '../../../helpers/createUserProfile';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    res.json({ message: 'posted' });
    // await createUserProfile(req, res).then(() => {
    // });
  } catch (error) {
    console.log('POST "api/survey" =>', error);
  }
});

export default (req, res) => handler.apply(req, res);
