const express = require('express')
const router = express.Router()
const {users, foods} = require('./handler')

router.get('/', (req, res) => {
    res.send("hallo world")
})
router.get('/users', users)
router.get('/foods', foods)

module.exports = router