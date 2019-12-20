const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
})

const league = require('./lib/league')

const cors = require('cors')({
    origin: true,
})

const db = admin.firestore()

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
            await league.updateLeague(req.body.eventName, req.body.obj)
            res.status(200).send({status: 'created'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.returnleaguenames = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let data = await league.returnLeaguesNames()
            res.status(200).send({status: data})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
