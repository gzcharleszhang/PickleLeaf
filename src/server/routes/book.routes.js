const express = require('express');

const router = express.Router();
const BookController = require('../controllers/book.controller');
const { authenticate } = require('../util');

router.post('/create/:isbn', authenticate, BookController.create);

module.exports = router;
