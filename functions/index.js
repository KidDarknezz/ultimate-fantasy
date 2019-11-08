const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
})

const db = admin.firestore()

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!')
})
