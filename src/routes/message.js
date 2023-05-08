const express = require('express')

const messageController = require('../controller/message.js')

const router = express.Router()

router.get('/', messageController.getMessage)

router.post('/', messageController.pushMessage)

router.patch('/:id', messageController.updateMessage)

module.exports = router