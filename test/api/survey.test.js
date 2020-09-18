const { MongoClient } = require('mongodb');
const axios = require('axios');
const { default: middleware } = require('../../src/middleware');



jest.mock('axios');

const API = 'http://localhost:3000/api/survey';
const data = { pin: 0 };

const postData = async (url, query) => {
  return await axios.post(url, query);
};

const fetchData = async (url, query) => {
  return await axios.get(url, query);
};

describe('Testing KYCS Survey API', () => {
  let connection;
  let db;
  
  beforeAll(async () => {
    connection =
      (await MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }));
    db = await connection.db();
  });
  /**
   * CREATE Survey API
   */
  test('Create Survey API ROUTE', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(data));
    await expect(postData(API, data)).resolves.toEqual(data);
    expect(axios.post).toHaveBeenCalledWith(`${API}`, data);
  });
  /**
   * POST SURVEY FUNCTION
   */
  test('postSurvey()', () => {
    
  });
  
  /**
   * GET SURVEY API
   */
  test('Get Survey', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(fetchData(API, data)).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(`${API}`, data);
  });

  /**
   * TEST NETWORK ERROR
   */
  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(fetchData(API, data)).rejects.toThrow(errorMessage);
  });



   afterAll(async () => {
     await connection.close();
   });
});
