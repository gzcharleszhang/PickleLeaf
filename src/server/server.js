//server/server.js
const express = require('express');
const router = require('./routes/routes.js')
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

mongoose.connect('mongodb://fit-connect-creator:ilovecs246@ds139970.mlab.com:39970/fit-connect')

app.get('/', function(req, res) {
  res.render('index');
});

app.use('/api', router);

module.exports = app;
