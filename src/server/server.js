// server/server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const router = require('./routes/routes.js');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`running at localhost: ${port}`);
});

app.use(morgan('dev'));

app.use(cors());

app.set('view engine', 'html');
if (process.env.NODE_ENV === 'production') {
  app.set('views', path.join(__dirname, '../../public'));
  app.use(express.static(path.join(__dirname, '../../public')));
  app.get('/', (req, res) => {
    res.render('index');
  });
}

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

mongoose.connect(process.env.MONGO_URL, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
}).then(() => console.log('successfully connected to mongo'))
  .catch(err => console.log(err));

app.use('/api', router);

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { message, statusCode } = err;
  if (!message) {
    message = 'Server Error';
  }
  if (!statusCode) {
    statusCode = 500;
  }
  res.status(statusCode).json({ message, statusCode });
};

app.use(errorHandler);

module.exports = app;
