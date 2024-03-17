const express = require('express');
const checkAuth = require('../middlewares/checkAuth.js');
const { getUser, getUsers } = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/', checkAuth, getUsers);
router.get('/:id', checkAuth, getUser);

module.exports = router;