export async function setUpDb(db) {
  db.collection('profile').createIndex({ pubAddress: 1 }, { unique: true });
}
