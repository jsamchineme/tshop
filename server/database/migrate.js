import mysqlImport from 'mysql-import';
import logger from '../services/logger';
import migrationConfig from './migrationConfig';

mysqlImport.config({
  ...migrationConfig,
	onerror: err => logger.error(err.message)
}).import('server/database/migrate.sql').then(() => {
	logger.info('migration complete');
});