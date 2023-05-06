const express = require('express')

const messageController = require('../controller/message.js')

const router = express.Router()

router.get('/', messageController.getMessage)

router.post('/', messageController.pushMessage)

module.exports = router