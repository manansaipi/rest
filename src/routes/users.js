const express = require('express')

const usersController = require('../controller/users')

const router = express.Router()

//app.method(path, handler)
router.get('/', usersController.getAllUsers) //path "/" will refer to /users because grouping in app.js file so no need to              write'/users' in here. if so will refer to -> /users/users

//CREATE user - POST
router.post('/', usersController.createUser) 

//UPDATE user - PATCH -> update several data but won't change other data
router.patch('/:id', usersController.updateUser) 
//UPDATE user - put -> update several data and will change other data, if the data is empty will asign empty

router.delete('/:id', usersController.deleteUser)


router.post('/register', usersController.register)
router.get('/login', usersController.login)

module.exports = router //if import not using -> '{}' in order to import this method no need to call the function name? will take everything inside the varibale

//https://youtu.be/8GTB2ge0-ZM