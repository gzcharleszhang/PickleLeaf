const express = require('express');

const router = express.Router();
const PostingController = require('../controllers/posting.controller');

router.get('/', PostingController.fetch);

router.post('/', PostingController.create);

module.exports = router;
