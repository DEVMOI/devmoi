const authSchema = {
  $jsonSchema: {
    bsonType: 'object',
    properties: {
      nonce: {
        bsonType: 'string',
        description: 'must be a string',
        default: () => Math.floor(Math.random() * 1000000),
      },
      publicAddress: {
        bsonType: 'string',
        description: 'must be a string',
      },
      username: {
        bsonType: 'string',
        description: 'must be a string',
      },
      
    },
  },
};

module.exports = authSchema;
