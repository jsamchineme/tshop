import dotenv from 'dotenv';
import logger from 'src/services/logger';

dotenv.config();

const errorHandler = (err, req, res, next) => {
  logger.info(err.stack);

  const { response: httpErrorResponse } = err;
  let operationalErrorResponse = {
    status: 500,
    message: 'Internal Server Error'
  };

  const { NODE_ENV, DEBUG } = process.env;

  if (NODE_ENV === 'development' && Boolean(DEBUG)) {
    operationalErrorResponse = {
      status: 500,
      stack: err.stack,
      message: err.message
    };
  }

  if (!err) {
    next();
  }
  const errorResponse = httpErrorResponse || operationalErrorResponse;
  return res.status(errorResponse.status).json(errorResponse);
};

export default errorHandler;
