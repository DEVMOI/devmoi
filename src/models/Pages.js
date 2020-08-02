const pagesSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['page','visibility', 'content'],
    properties: {
      page: {
        bsonType: 'string',
        description: 'must be a string',
      },
      visibility: {
        bsonType: ['bool'],
        description: 'visibility is an optional boolean value',
      },
      thumbnail: {
        bsonType: ['objectId', 'null'],
        description: 'must be an objectid',
      },
      sections: {
        bsonType: 'string',
        description: 'must be an sring',
      },
    },
  },
};

module.exports = pagesSchema;
