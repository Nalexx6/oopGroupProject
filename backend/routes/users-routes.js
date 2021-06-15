const express = require('express');

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/:uid', usersController.getUserById);

router.get('/', usersController.getUsers);

router.get('/login', usersController.login);

router.post('/signup', usersController.signup);

module.exports = router;