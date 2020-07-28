const MongoClient = require('mongodb').MongoClient;

const localDB = process.env.localMongoURI;
const dockerDB = process.env.dockerMongoURI;

let _db, connDB;

const connectDB = async (callback) => {
  try {
    const client = new MongoClient(dockerDB, {poolSize:50}, { useUnifiedTopology: true });
    client.connect((err) => {
      if (err) {
        return callback(err);
      } else {
      }
      console.log('DB initialized - connnected to:' + dockerDB.split('@'[1]));
      connDB = client;
      var dbase = client.db(process.env.DB_NAME);
      _db = dbase;
        callback(null, _db);
    });
  } catch (e) {
    callback(e);
    throw e;
  }
};

const getDB = () => {
  return _db;
};
const getConnDB = () => {
  return connDB;
};

const disconnectDB = () => {
  console.log('db closing.......');
  _db.close();
};

module.exports = { connectDB, getDB, getConnDB, disconnectDB };
