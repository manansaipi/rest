const express = require('express')

const messageController = require('../controller/message')

const router = express.Router()

router.get('/', messageController.getMessage)

router.post('/', messageController.pushMessage)

router.patch('/:id', messageController.updateMessage)

router.delete('/:id', messageController.deleteMessage)

module.exports = router