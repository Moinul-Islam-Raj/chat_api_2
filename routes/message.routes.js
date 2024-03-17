const express = require('express');
const { sendMessage, getMessages, deleteMessage } = require('../controllers/message.controller');
const checkAuth = require('../middlewares/checkAuth.js');

const router = express.Router();

router.post('/send/:reciepientId', checkAuth, sendMessage);
router.get('/:id', checkAuth, getMessages);
// router.delete('/:id', checkAuth, deleteMessage);

module.exports = router;