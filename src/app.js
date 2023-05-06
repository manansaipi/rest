require('dotenv').config()

//core modules
const express = require('express')
const fs = require('fs')

const usersRoutes = require('./routes/users.js')
const foodsRoutes = require('./routes/foods.js')
const uploadRoutes = require('./routes/upload.js')
const messageRoutes = require('./routes/message.js')

const middlewareLogReq = require('./middleware/logs.js')
const upload = require('./middleware/multer.js')

const app = express()

const hostname = 'localhost'
const port = process.env.port || 4000



// app.use((req, res, next) => { //this is middleware, when there is one path request to the api, the program will go here first and will do check whatever we want to check, and will continue if success using next() method 
//     console.log("check")
//     next() //->if success continue to path request. 
// })

// app.use(middlewareLogReq.logRequest) //same like middleware above, but this one is from middleware folder in logs.js file
    


app.use(express.json())//this middle ware allow JSON req.body 
app.use(express.static('public/images'))//this will allow access static file in public folder inside images folder and to get access into the file need to make a request to = http://localhost:4000/filename.extension 

app.use("/users", usersRoutes) //Grouping path users in users.js file
app.use("/foods", foodsRoutes) //grouping path food in foods.js file

app.use('/upload',upload.single('photo'), uploadRoutes)

app.use('/message', messageRoutes)

app.use((err, req, res, next) => { //err handling
    res.json({
        message: err.message
    })

})


app.use("/", (req, res) => { //else
    res.sendStatus(404)
}) 

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

