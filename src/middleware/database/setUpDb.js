export async function setUpDb(db) {
  db.collection('survey').createIndex({ pin: -1 }, { unique: true });
}
