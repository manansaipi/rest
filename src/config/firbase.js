const admin = require('firebase-admin')
const firebase = require('firebase/app')
require('firebase/auth')

const serviceAccount = require('../../credentials/firebase.json') //credentials-key

admin.initializeApp({ //init
    credential: admin.credential.cert(serviceAccount), //credentials
    databaseURL: 'https://qwiklabs-gcp-02-ba6ad936e94b-default-rtdb.asia-southeast1.firebasedatabase.app/'
})
firebase.initializeApp({
    apiKey: 'AIzaSyD9BL4YvmvsfPrK_kGrFDkloD6obR3S-pI',
    authDomain: 'https://accounts.google.com/o/oauth2/auth',
    projectId: 'qwiklabs-gcp-02-ba6ad936e94b',
})

module.exports = {
    admin,
    firebase
}