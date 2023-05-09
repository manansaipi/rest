
const firebase = require('firebase-admin');


// const serviceAccount = require("../credentials/firebase.json"); //credentials-key

// firebase.initializeApp({ //init
//     credential: firebase.credential.cert(serviceAccount), //credentials
//     databaseURL: 'https://qwiklabs-gcp-02-7c483df161e8-default-rtdb.asia-southeast1.firebasedatabase.app/'
// });
//CRUD
//R
const getMessage = (req, res ) => {
    // read messages from database
  firebase.database().ref('messages2').once('value') //messages2 same like root folder so every message here will get from messages2
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
}
//C
const pushMessage = (req, res ) => {
    const { message } = req.body
    try {
        // write message to database
        firebase.database().ref('messages2').push({ //messages2 same like root folder so every message here will push to messages2
            message,
            timestamp: new Date().getTime()
        })
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Error sending message');
    }
}
const updateMessage = (req, res ) => {
    const messageId = req.params.id;
    const updatedMessage = req.body;
    try {
        const messageRef = firebase.database().ref(`/messages/${messageId}`);
        messageRef.update(updatedMessage)

        res.send('Message updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to update message');
    }
}

module.exports = {
    getMessage,
    pushMessage,
    updateMessage
}








// //CRUD
// //C
// app.post('/message', (req, res) => {
//   const { message } = req.body;

//   // write message to database
//   firebase.database().ref('messages2').push({ //messages2 same like root folder so every message here will push to messages2
//     message,
//     timestamp: new Date().getTime()
//   })
//     .then(() => {
//       res.status(200).send('Message sent successfully');
//     })
//     .catch((error) => {
//       console.error('Error sending message:', error);
//       res.status(500).send('Error sending message');
//     });
// });

// app.get('/message', (req, res) => {
//   // read messages from database
//   firebase.database().ref('messages2').once('value') //messages2 same like root folder so every message here will get from messages2
//     .then((snapshot) => {
//       const messages = [];

//       snapshot.forEach((childSnapshot) => {
//         const message = childSnapshot.val();
//         messages.push(message);
//       });

//       res.status(200).send(messages);
//     })
//     .catch((error) => {
//       console.error('Error retrieving messages:', error);
//       res.status(500).send('Error retrieving messages');
//     });
// });


