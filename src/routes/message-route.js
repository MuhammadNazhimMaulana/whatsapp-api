// Contoh Routing
const express = require('express');
const router = express.Router();
const MessageController = require('../api/controllers/MessageController')

const messageController = new MessageController()

// Halaman Home
router.post('/pesan', messageController.index)

module.exports = router;