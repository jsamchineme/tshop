import mysqlImport from 'mysql-import';
import logger from 'src/utils/logger';
import migrationConfig from '../migrationConfig';

// setup mysql tables
mysqlImport.config({
  ...migrationConfig,
  onerror: err => logger.error(err.message)
}).import('server/database/migration/migrate.sql').then(() => {
  logger.info('migration complete');
});
