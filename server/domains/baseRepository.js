import { generatePaginationMeta } from 'src/utils/pagination';
import redisClient from 'src/services/caching/redis';
import logger from 'src/utils/logger';

export default {
  /**
   * Retrieve the collection of record for the query
   * @param {Object} fetchOptions - The options used for retrieving data
   * @param {String} fetchOptions.domain - the domain being requested eg. product domain
   * @param {String} fetchOptions.requestURL - the URL requested
   * @param {Object} fetchOptions.paginationMeta - the properties sent in request for pagination
   * @param {Function} fetchOptions.fetchFromDB - fetch from database if data is not in the cache
   * @returns {Object} - an object with "rows" and "meta" fields
   */
  async getCollectionData({
    domain,
    requestURL,
    paginationMeta,
    fetchFromDB,
  }) {
    const key = `domain:${domain}://${requestURL}`;
    const dataStringRetrieved = await redisClient.getAsync(key);

    let responseData;
    if (dataStringRetrieved === null) {
      const result = await fetchFromDB();
      responseData = {
        rows: result.rows,
      };
      // add pagination meta data if available as property in the method's parameter
      if (paginationMeta) {
        const paginationMetaData = await generatePaginationMeta(result.count, paginationMeta);
        responseData.meta = paginationMetaData;
      }
      this.storeOnRedis(key, responseData);
    } else {
      responseData = JSON.parse(dataStringRetrieved);
    }

    return responseData;
  },

  /**
   * Retrieve a record
   * @param {Object} fetchOptions - The options used for retrieving data
   * @param {String} fetchOptions.domain - the domain being requested eg. product domain
   * @param {String} fetchOptions.requestURL - the URL requested
   * @param {Function} fetchOptions.fetchFromDB - fetch from database if data is not in the cache
   * @returns {Object} - the object matching the search
   */
  async getItemData({
    domain,
    requestURL,
    fetchFromDB,
  }) {
    const key = `domain:${domain}://${requestURL}`;
    const dataStringRetrieved = await redisClient.getAsync(key);

    let responseData;
    if (dataStringRetrieved === null) {
      responseData = await fetchFromDB();
      this.storeOnRedis(responseData);
    } else {
      responseData = JSON.parse(dataStringRetrieved);
    }

    return responseData;
  },

  /**
   * Cache queried data in the redis store
   * @param {String} key - The key set for the caching
   * @param {Object} data - the data to be stored
   * @returns {void}
   */
  async storeOnRedis(key, data) {
    await redisClient.setAsync(key, JSON.stringify(data));
  },

  /**
   * clear the redis keys matching a domain
   * @param {String} domain - the domain to be cleared eg. product
   * @returns {void}
   */
  async clearRedis(domain) {
    const storedKeys = await redisClient.keysAsync(`domain:${domain}://*`);
    storedKeys.forEach(key => redisClient.delAsync(key));
    logger.info(`redis cache cleared for domain:${domain}`);
  }
};
