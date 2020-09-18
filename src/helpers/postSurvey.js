import util from '../util';
const { isJson } = util;
export default async function postSurvey(req, res) {
  try {
    let data;

    (await isJson(req.body))
      ? (data = JSON.parse(req.body))
      : (data = req.body);

    let { pin } = data;

    pin !== undefined
      ? await req.db
          .collection('survey')
          .updateOne(
            { pin: pin },
            { $set: data, $currentDate: { lastModified: true } },
            { upsert: true },
            (err, result) => {
              res.json({ message: 'posted' });
            }
          )
      : null;
  } catch (error) {
    console.log('postSurvey =>', error);
  }
}
