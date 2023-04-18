const express = require('express')

const usersController = require('../controller/users.js')

const router = express.Router()

//app.method(path, handler)
router.get('/', usersController.getAllUsers) //path "/" will refer to /users because grouping in app.js
router.post('/', usersController.createUsers) 

module.exports = router