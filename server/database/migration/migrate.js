import mysqlImport from 'mysql-import';
import logger from 'src/utils/logger';
import { ALL_DOMAINS } from 'config/constants';
import baseRepository from 'domains/baseRepository';
import migrationConfig from '../migrationConfig';

// setup mysql tables
mysqlImport.config({
  ...migrationConfig,
  onerror: err => logger.error(err.message)
}).import('server/database/migration/migrate.sql').then(async () => {
  logger.info('migration complete');

  // clear the redis database for all domains
  const clearedDomains = ALL_DOMAINS.map(async (domain) => {
    await baseRepository.clearRedis(domain);
  });

  await Promise.all(clearedDomains);
  logger.info(`redis cached reset for ${clearedDomains.length} domains`);
  process.exit(0);
});
