const express = require('express')

const foodsController = require('../controller/foods')

const router = express.Router()

//app.method(path, handler)
router.get('/', foodsController.getAllFoods) //path / will refer to /foods because already grouping in app.js file so no need to write /foods anymore, if so will refer to -> /foods/foods

router.post('/', foodsController.createFood)

module.exports = router