const express = require('express')
const app = express()

const routes = require('./routes/routes.js')

const hostname = 'localhost'
const port = 3000

app.use(routes) //routing in routes.js

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

