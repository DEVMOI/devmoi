const mediaSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['mediaTitle', 'mediaType'],
    properties: {
      uploadedBy: {
        bsonType: ['objectId'],
      },
      mediaTitle: {
        bsonType: ['string'],
        description: 'must be a string',
      },
      mediaProps: {
        bsonType: ['object', 'null'],
        required: ['fileName', 'fileMimeType', 'fileSize'],
        properties: {
          fileData: {
            bsonType: 'binData',
            description: 'must be binary data',
          },
          fileName: {
            bsonType: 'string',
            description: 'must be a string',
          },
          fileMimeType: {
            bsonType: 'string',
          },
          fileSize: {
            bsonType: 'int',
          },
          fileEncoding: {
            bsonType: 'string',
          },
        },
      },
      mediaType: {
        bsonType: ['string'],
        enum: ['Image', 'Video', 'PDF'],
      },
      mediaLocation: {
        bsonType: ['string'],
        description: 'must be a string',
      },
      tags: {
        bsonType: ['array'],
        description: 'must be an array',
      },
      keywords: {
        bsonType: ['array'],
        description: 'must be an array',
      },
      metadata: {
        bsonType: ['object'],
        properties: {
          credits: {
            bsonType: ['string'],
            description: 'must be a string'
          },
          captions: {
            bsonType: ['string'],
            description: 'must be a string'
          },
          altText: {
            bsonType: ['string'],
            description: 'must be a string'
          },
          transcript: {
            bsonType: ['string'],
            description: 'must be a string'
          },
          uploadDate: {
            bsonType: ['string'],
            description: 'must be a string'
          },
          authors: {
            bsonType: ['array'],
            description: 'must be an array'
          },
          status: {
            bsonType: ['string'],
            enum: ['pending', 'approved'],
            description: 'must be a string',
          },
        },
      },
    },
  },
};

module.exports = mediaSchema;