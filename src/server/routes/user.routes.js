const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/users', UserController.fetch);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/check-duplicate-email/:email', UserController.checkDuplicateEmail);

module.exports = router;
