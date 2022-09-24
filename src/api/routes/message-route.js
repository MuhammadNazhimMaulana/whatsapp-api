// Contoh Routing
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController')

const messageController = new MessageController()

// Halaman Home
router.post('/', messageController.index)

module.exports = router;