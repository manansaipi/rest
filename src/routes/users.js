const express = require('express')

const usersController = require('../controller/users.js')

const router = express.Router()

//app.method(path, handler)
router.get('/', usersController.getAllUsers) //path "/" will refer to /users because grouping in app.js file so no need to write /users in here. if so will refer to -> /users/users
router.post('/', usersController.createUser) 

module.exports = router