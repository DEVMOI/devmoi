import { MongoClient } from 'mongodb';
import { setUpDb } from './setUpDb';

const dockerDB = process.env.dockerMongoURI;
const client = new MongoClient(dockerDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.DB_NAME);
  setUpDb(req.db);
  return next();
}
