import nextConnect from 'next-connect';
import middleware from '../../../middleware';
// import { ObjectID }S from 'mongodb';
import getSurvey from '../../../helpers/getSurvey';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  await getSurvey(req, res)
    .then((result) => {
      result !== null
        ? res.json({ result })
        : res.json({ result: { message: 'Survey Does Not Exist' } });
    })
    .catch((error) => {
      console.log('GET "api/survey/get" =>', error);
    });
});

export default (req, res) => handler.apply(req, res);
