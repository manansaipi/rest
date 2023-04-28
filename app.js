require('dotenv').config()

const express = require('express')

const middlewareLogReq = require('./src/middleware/logs')
const usersRoutes = require('./src/routes/users.js')
const foodsRoutes = require('./src/routes/foods.js')

const app = express()

const hostname = 'localhost'
const port = process.env.port || 4000


// app.use((req, res, next) => { //this is middleware, when there is one path request to the api, the program will go here first and will do check whatever we want to check, and will continue if success using next() method 
//     console.log("check")
//     next() //->if success continue to path request. 
// })

// app.use(middlewareLogReq.logRequest) //same like middleware above, but this one is from middleware folder in logs.js file
    

app.get("/", (req, res) => { //default/empty route 
    res.send("HOME")
})

app.use(express.json())//this middle ware allow JSON req.body 

app.use("/users", usersRoutes) //Grouping path users in users.js file
app.use("/foods", foodsRoutes) //grouping path food in foods.js file


app.use("/", (req, res) => { //else
    res.sendStatus(404)
}) 

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

