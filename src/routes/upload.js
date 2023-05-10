const express = require('express')

const uploadController = require('../controller/upload')

const router = express.Router()

//UPLOAD photo
router.post('/', uploadController.uploadPhoto) 

module.exports = router 
