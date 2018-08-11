// server/server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const mongoose = require('mongoose');
const router = require('./routes/routes.js');

app.use(morgan('dev'));

app.set('view engine', 'html');

if (process.env.NODE_ENV === 'production') {
  app.set('views', path.join(__dirname, '../public'));
  app.use(express.static(path.join(__dirname, '../public')));
  app.get('/', (req, res) => {
    res.render('index');
  });
}

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

mongoose.connect('mongodb://fit-connect-creator:ilovecs246@ds139970.mlab.com:39970/fit-connect');

app.use('/api', router);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500);
  res.render('error', { error: err });
  return null;
};

app.use(errorHandler);

const port = 8000;

app.listen(port, () => {
  console.log(`running at localhost: ${port}`);
});

module.exports = app;
