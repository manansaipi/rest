const firebase = require('firebase-admin')

const serviceAccount = require('../../credentials/firebase.json') //credentials-key

firebase.initializeApp({ //init
    credential: firebase.credential.cert(serviceAccount), //credentials
    databaseURL: 'https://qwiklabs-gcp-00-7d3289e966da-default-rtdb.asia-southeast1.firebasedatabase.app/'
})
//CRUD

//C
const pushMessage = (req, res) => {
    const { message } = req.body
    try {
        // write message to database into "messages2" collection
        const newMessageRef = firebase.database().ref('messages2').push({ //messages2 same like root folder so every message here will push to messages2
            message,
            timestamp: new Date().getTime()
        })
        const messageId = newMessageRef.key // get the ID of the newly created message
        res.status(200).json({
            message: 'Success to send message',
            data: {
                messageId,
                message
            }
        })
    } catch (error) {
        console.error('Error sending message:', error)
        res.status(500).send('Error sending message')
    }
}

//R
const getMessage = (req, res) => {
    // get a database reference to the 'messages2' collection
    firebase.database().ref('messages2').once('value') //messages2 same like root folder so every message here will get from messages2
        .then((snapshot) => {
            const messages = []

            // loop through all the messages in the snapshot
            snapshot.forEach((childSnapshot) => {
                const messageId = childSnapshot.key
                const message = childSnapshot.val()
                
                // add the message and its ID to the array
                messages.push({
                    id: messageId,
                    message
                })
            })
            res.status(200).json({
                message: 'Succes to get all message',
                data: {
                    messages
                }
            })
        })                                               
        .catch((error) => {
            console.error('Error retrieving messages:', error)
            res.status(500).send('Error retrieving messages')
        })
}

//U
const updateMessage = (req, res) => {
    const messageId = req.params.id
    const updatedMessage = req.body
    try {
        // get a database reference to the message with the given ID
        const messageRef = firebase.database().ref(`/messages2/${messageId}`)

        // update message in the database
        messageRef.update(updatedMessage)
        res.status(200).json({
            message: 'Update message success',
            data: {
                messageId,
                ...updatedMessage
            }
        }) 
    } catch (error) {
        console.error(error)
        res.status(500).send('Failed to update message')
    }
}

//D
const deleteMessage = (req, res) => {
    const messageId = req.params.id

    // get a database reference to the message with the given ID
    const messageRef = firebase.database().ref(`messages2/${messageId}`)
    try {
        // deleting message
        messageRef.remove()
        res.status(200).json({
            message: `Message with id -> ${messageId}, successfully deleted`,
        })
    } catch (error) {
        res.status(500).json({
            message: `Error deleting message ${messageId}`,
            serverMessage: error,
        })
    }
}

module.exports = {
    getMessage,
    pushMessage,
    updateMessage,
    deleteMessage
}






// //CRUD
// //C
// app.post('/message', (req, res) => {
//   const { message } = req.body

//   // write message to database
//   firebase.database().ref('messages2').push({ //messages2 same like root folder so every message here will push to messages2
//     message,
//     timestamp: new Date().getTime()
//   })
//     .then(() => {
//       res.status(200).send('Message sent successfully')
//     })
//     .catch((error) => {
//       console.error('Error sending message:', error)
//       res.status(500).send('Error sending message')
//     })
// })

// app.get('/message', (req, res) => {
//   // read messages from database
//   firebase.database().ref('messages2').once('value') //messages2 same like root folder so every message here will get from messages2
//     .then((snapshot) => {
//       const messages = []

//       snapshot.forEach((childSnapshot) => {
//         const message = childSnapshot.val()
//         messages.push(message)
//       })

//       res.status(200).send(messages)
//     })
//     .catch((error) => {
//       console.error('Error retrieving messages:', error)
//       res.status(500).send('Error retrieving messages')
//     })
// })


