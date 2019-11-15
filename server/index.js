/* istanbul ignore file */
import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import logger from 'morgan';
import debug from 'debug';
import cors from 'cors';
import helpers from './helpers';

config();

const { PORT = 3000, NODE_ENV } = process.env;
const { errorHelper: { error404, developmentError, productionError } } = helpers;
const isProduction = NODE_ENV === 'production';
const log = debug('dev');
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.get('/', (request, response) => {
  response.status(200).send('Welcome to the mPharma API!');
});

// catch 404 and forward to error handler
app.use(error404);

// development error handler
if (!isProduction) {
  app.use(developmentError);
}

// production error handler
app.use(productionError);

app.listen(PORT, () => log(`App listening on port ${PORT}!`));

export default app;
