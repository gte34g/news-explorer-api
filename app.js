const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const { errors } = require('celebrate');
const {
  MONGO_DB = 'mongodb://localhost:27017/newsdb',
  PORT = 3000,
} = require('./utils/config');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect(MONGO_DB);
app.use(cors());

app.options('*', cors());

app.use(helmet());

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
