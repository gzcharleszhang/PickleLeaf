const express = require('express');

const router = express.Router();
const PostingController = require('../controllers/posting.controller');
const { authenticate } = require('../util');

router.get('/', PostingController.fetch);

router.post('/', authenticate, PostingController.create);

module.exports = router;
