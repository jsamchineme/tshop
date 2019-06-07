import dotenv from 'dotenv';
import logger from 'src/utils/logger';

dotenv.config();

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_NAME,
  TEST_DB_HOST,
  TEST_DB_USER,
  TEST_DB_PASS,
  TEST_DB_PORT,
  TEST_DB_NAME,
  NODE_ENV,
} = process.env;


let host, user, password, port, database;
switch (NODE_ENV) {
  case 'test':
    host = TEST_DB_HOST;
    user = TEST_DB_USER;
    password = TEST_DB_PASS;
    port = TEST_DB_PORT;
    database = TEST_DB_NAME;
    break;
  default:
    host = DB_HOST;
    user = DB_USER;
    password = DB_PASS;
    port = DB_PORT;
    database = DB_NAME;
}

const migrationConfig = {
  host,
  user,
  password,
  port,
  database,
};

logger.info(`Environment::: ${NODE_ENV}`);

export default migrationConfig;
