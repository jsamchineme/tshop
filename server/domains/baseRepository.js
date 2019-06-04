import { generatePaginationMeta } from 'src/services/pagination';
import redisClient from 'src/services/caching/redis';

export default {
  async getCollectionData({
    domain,
    requestURL,
    paginationMeta,
    fetchFromModel,
  }) {
    const key = `domain:${domain}://${requestURL}`;
    const dataStringRetrieved = await redisClient.getAsync(key);

    let responseData;
    if (dataStringRetrieved === null) {
      const result = await fetchFromModel();
      const paginationMetaData = await generatePaginationMeta(result.count, paginationMeta);
      responseData = {
        rows: result.rows,
        meta: paginationMetaData,
      };
      this.storeOnRedis(key, responseData);
    } else {
      responseData = JSON.parse(dataStringRetrieved);
    }

    // clear redis
    // this.clearRedis(key);

    return responseData;
  },
  async getItemData({
    domain,
    requestURL,
    fetchFromModel,
  }) {
    const key = `domain:${domain}://${requestURL}`;
    const dataStringRetrieved = await redisClient.getAsync(key);

    let responseData;
    if (dataStringRetrieved === null) {
      responseData = await fetchFromModel();
      this.storeOnRedis(responseData);
    } else {
      responseData = JSON.parse(dataStringRetrieved);
    }

    return responseData;
  },
  async storeOnRedis(key, response) {
    await redisClient.setAsync(key, JSON.stringify(response));
  },
  async clearRedis(domain) {
    const storedKeys = await redisClient.keysAsync(`domain:${domain}://*`);
    storedKeys.forEach((key) => {
      redisClient.delAsync(key);
    });
  }
};
