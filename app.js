const express = require('express')
const app = express()

const usersRoutes = require('./src/routes/users.js')

const hostname = 'localhost'
const port = 3000

app.get("/", (req, res) => { //default/empty route 
    res.send("HOME")
})

app.use("/users", usersRoutes) //Grouping path users in users.js

app.use("/", (req, res) => { //else
    res.send(404)
}) 

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

