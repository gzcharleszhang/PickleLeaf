const express = require('express');

const router = express.Router();
const BookController = require('../controllers/book.controller');
const { authenticate } = require('../util');

router.post('/:isbn', authenticate, BookController.create);

router.get('/', BookController.fetch);

module.exports = router;
