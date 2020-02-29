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

exports.auth = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const tokenId = req.get('Authorization').split('Bearer ')[1]

        return admin
            .auth()
            .verifyIdToken(tokenId)
            .then(decoded => res.status(200).send(decoded))
            .catch(err => res.status(401).send(err))
    })
})

exports.createleague = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await league.createLeague(req.body.event, req.body.obj)
            res.status(200).send({status: 'updated'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})

exports.updateleague = functions.https.onRequest(async (req, res) => {
    //TODO: Tiene que hacer un backup antes de subir
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
exports.returnleaguebyid = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let data = await league.returnLeagueById(req.body.leagueId)
            res.status(200).send({status: data})
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
exports.returnactiveleagues = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let data = await league.returnActiveLeagues()
            res.status(200).send({status: data})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.subscribetoleague = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let data = await league.subscribeToLeague(
                req.body.uid,
                req.body.league
            )
            res.status(200).send({status: data})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.returnsubscribeleagues = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let data = await league.returnSubscribeLeagues(req.body.uid)
            res.status(200).send({status: data})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.checksteps = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let data = await league.checkSteps(req.body.uid, req.body.leagueId)
            res.status(200).send({status: data})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.returnteamnamesinleague = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let data = await league.returnTeamNamesInLeague(
                    req.body.leagueId
                )
                res.status(200).send({status: data})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.addteamnametoleague = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let data = await league.addTeamNameToLeague(
                req.body.leagueId,
                req.body.teamName,
                req.body.uid
            )
            res.status(200).send({status: data})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})

//Necesito un endpoint que me mande todos los nombres de los jugadores para poder hacer el search bar
//Necesito un endpoint que retorne solo mi informacion
