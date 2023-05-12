const admin = require('firebase-admin')
// const firebase = require('firebase')

const serviceAccount = require('../../credentials/firebase.json') //credentials-key

admin.initializeApp({ //init
    credential: admin.credential.cert(serviceAccount), //credentials
    databaseURL: 'https://qwiklabs-gcp-03-8eeaf9fdf28b-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

module.exports = admin