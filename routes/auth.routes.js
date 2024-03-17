const express = require('express');
const { signup, logout, login } = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/signup/', signup);
router.post('/login/', login);
router.post('/logout/', logout);

module.exports = router;