require('dotenv').config()

const express = require('express')
const { Storage } = require('@google-cloud/storage');
const firebase = require('firebase-admin');
const fs = require('fs')

const usersRoutes = require('./routes/users.js')
const foodsRoutes = require('./routes/foods.js')
const uploadRoutes = require('./routes/upload.js')

const middlewareLogReq = require('./middleware/logs.js')
const upload = require('./middleware/multer.js')

const app = express()

const hostname = 'localhost'
const port = process.env.port || 4000


var admin = require("firebase-admin");

var serviceAccount = require("../credentials/serviceAccountKey.json");
// app.use((req, res, next) => { //this is middleware, when there is one path request to the api, the program will go here first and will do check whatever we want to check, and will continue if success using next() method 
//     console.log("check")
//     next() //->if success continue to path request. 
// })

// app.use(middlewareLogReq.logRequest) //same like middleware above, but this one is from middleware folder in logs.js file
    


app.use(express.json())//this middle ware allow JSON req.body 
app.use(express.static('public/images'))//this will allow access static file in public folder inside images folder and to get access into the file need to make a request to = http://localhost:4000/filename.extension 




admin.initializeApp({ //init
    credential: admin.credential.cert(serviceAccount), //credentials
    databaseURL: 'https://qwiklabs-gcp-02-7c483df161e8-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

app.post('/message', (req, res) => {
  const { message } = req.body;

  // write message to database
  admin.database().ref('messages2').push({ //messages2 same like root folder so every message here will push to messages2
    message,
    timestamp: new Date().getTime()
  })
    .then(() => {
      res.status(200).send('Message sent successfully');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).send('Error sending message');
    });
});

app.get('/message', (req, res) => {
  // read messages from database
  admin.database().ref('messages2').once('value') //messages2 same like root folder so every message here will get from messages2
    .then((snapshot) => {
      const messages = [];

      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        messages.push(message);
      });

      res.status(200).send(messages);
    })
    .catch((error) => {
      console.error('Error retrieving messages:', error);
      res.status(500).send('Error retrieving messages');
    });
});











app.use("/users", usersRoutes) //Grouping path users in users.js file
app.use("/foods", foodsRoutes) //grouping path food in foods.js file

app.use('/upload',upload.single('photo'), uploadRoutes)

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

