// Contoh Routing
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController')
const { auth } = require('../middleware/auth')

const messageController = new MessageController()

// Adding Middleware
router.use(auth)


// Sending Message
router.post('/', messageController.store)

// Getting Contacts And Group
router.post('/contacts', messageController.contacts)

// Sending Message with picture
router.post('/media', messageController.storePicture)

module.exports = router;