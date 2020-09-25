import nextConnect from 'next-connect';
import middleware from '../../../middleware';
import { ObjectID } from 'mongodb';
import postSurvey from '../../../helpers/postSurvey';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    await postSurvey(req, res).then(() => {
      res.json({ message: 'posted' });
    });
  } catch (error) {
    console.log('POST "api/survey" =>', error);
  }
});

export default (req, res) => handler.apply(req, res);
