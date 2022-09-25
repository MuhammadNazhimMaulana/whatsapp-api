// Contoh Routing
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController')
const { auth } = require('../middleware/auth')

const messageController = new MessageController()

// Adding Middleware
router.use(auth)

// Halaman Home
router.post('/', messageController.index)

module.exports = router;