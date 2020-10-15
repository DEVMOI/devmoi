const authSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'email', 'password', 'role', 'active'],
    properties: {
      name: {
        bsonType: 'string',
        description: 'must be a string',
      },
      email: {
        bsonType: 'string',
        pattern: "^.+\@.+$",
        description: 'must be a string',
      },
      password: {
        bsonType: 'string',
        description: 'must be a string',
      },
      role: {
        bsonType: ['array'],
        description: 'must be a string',
        minItems: 1,
        uniqueItems: true,
        items: {
          bsonType: 'string',
          description: 'must be a string'
        }
      },
      permissions: {
        bsonType: ['string', 'null'],
        enum: ['PostNoMod', 'two', null],
        description: 'can only be one of the enum values',
      },
      active: {
        bsonType: 'bool',
      },
      dateCreated: {
        bsonType: 'date',
      },
    },
  }
};

module.exports = authSchema;
