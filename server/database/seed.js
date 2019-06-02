import migrationConfig from './migrationConfig';
import logger from '../services/logger';
import mysqlImport from 'mysql-import';

mysqlImport.config({
	...migrationConfig,
	onerror: err => logger.error(err.message)
}).import('server/database/seed.sql').then(() => {
	logger.info('seeding complete');
});