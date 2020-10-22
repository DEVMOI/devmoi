export async function setUpDb(db) {
  db.collection('profile').createIndex(
    { email: 1, username: 1 },
    { unique: true }
  );
}
