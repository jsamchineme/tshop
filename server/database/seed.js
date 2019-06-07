import mysqlImport from 'mysql-import';
import logger from 'src/utils/logger';
import migrationConfig from './migrationConfig';

mysqlImport.config({
  ...migrationConfig,
  onerror: err => logger.error(err.message)
}).import('server/database/seed.sql').then(() => {
  logger.info('seeding complete');
});
