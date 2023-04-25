const express = require('express')
const app = express()

const usersRoutes = require('./src/routes/users.js')
const foodsRoutes = require('./src/routes/foods.js')

const hostname = 'localhost'
const port = 3000

app.get("/", (req, res) => { //default/empty route 
    res.send("HOME")
})

app.use("/users", usersRoutes) //Grouping path users in users.js file
app.use("/foods", foodsRoutes) //grouping path food in foods.js file

app.use("/", (req, res) => { //else
    res.sendStatus(404)
}) 

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

