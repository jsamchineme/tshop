import redis from 'redis';
import bluebird from 'bluebird';
import logger from 'src/utils/logger';
import dotenv from 'dotenv';

dotenv.config();
bluebird.promisifyAll(redis);

const {
  REDIS_URL,
} = process.env;

const redisClient = redis.createClient(REDIS_URL);

redisClient.on('connect', function () {
  logger.info('success connecting to redis');
});

redisClient.on('error', function (err) {
  logger.info(`fail connecting to redis ${err}`);
});

export default redisClient;
