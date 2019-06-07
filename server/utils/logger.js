import winston from 'winston';

/**
 * Console logger used throughout the app
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ]
});

export default logger;
