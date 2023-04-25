const express = require('express')
const app = express()

const middlewareLogReq = require('./src/middleware/logs')
const usersRoutes = require('./src/routes/users.js')
const foodsRoutes = require('./src/routes/foods.js')

const hostname = 'localhost'
const port = 3000

app.use((req, res, next) => { //this is middleware, when there is one path request to the api, the program will go here first and will do check whatever we want to check, and will continue if success using next() method 
    console.log("check")
    next() //->if success continue to path request. 
})

app.use(middlewareLogReq.logRequest) //same like middleware above, but this one is from middleware folder in logs.js file
    

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
