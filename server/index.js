import express from 'express';
import morganLogger from 'morgan';
import bodyParser from 'body-parser';
import baseRouter from './api/routes';
import logger from './services/logger';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// log responses
app.use(morganLogger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Welcome to Turing Shopping'
  });
});

app.use('/api', baseRouter);

app.use('*', (req, res) => {
  return res.status(200).send({
    error: 'Route not found'
  });
});

const port = process.env.PORT || 8003;

app.listen(port, () => logger.info(`app listening on port ${port}`));

export default app;