const express = require('express');

const router = express.Router();
const PostingController = require('../controllers/posting.controller');
const { authenticate } = require('../util');

router.get('/', PostingController.fetch);

router.post('/', authenticate, PostingController.create);

router.put('/:postingId', authenticate, PostingController.update);

router.delete('/:postingId', authenticate, PostingController.delete);

module.exports = router;
