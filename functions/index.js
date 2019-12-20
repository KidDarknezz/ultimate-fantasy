const functions = require('firebase-functions')
const admin = require('firebase-admin')

var defaultApp = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
})

const league = require('./lib/league')

const cors = require('cors')({
    origin: true,
})

const db = admin.firestore()
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!')
})

exports.createleague = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await league.createLeague(req.body.eventName, req.body.obj)
            res.status(200).send({status: 'updated'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.updateleague = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await league.updateLeague(req.body)
            res.status(200).send({status: 'created'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
