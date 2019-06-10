import express from 'express';
import morganLogger from 'morgan';
import bodyParser from 'body-parser';
import baseRouter from 'src/api/router';
import errorHandler from 'src/utils/errorHandler';
import { NODE_ENV } from 'src/config/constants';

const app = express();

if (NODE_ENV === 'development') {
  app.use(morganLogger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Welcome to Turing Shopping'
  });
});

app.use('/api', baseRouter);

app.use('*', (req, res) => {
  return res.status(404).send({
    error: 'Route not found'
  });
});

// handling all the request and async errors
app.use((err, req, res, next) => {
  return errorHandler(err, req, res, next);
});

export default app;
