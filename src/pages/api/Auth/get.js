import nextConnect from 'next-connect';
import middleware from '../../../middleware';
// import { ObjectID }S from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

});

export default (req, res) => handler.apply(req, res);
