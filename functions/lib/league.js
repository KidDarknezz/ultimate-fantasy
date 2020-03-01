const admin = require('firebase-admin')

async function updateLeague(eventName, object) {
    const db = admin.firestore()
    let Data = await formatObject(object)
    let CurrentData = {}
    for (const equipo of Object.keys(Data)) {
        await db
            .collection(eventName)
            .doc(equipo)
            .get()
            .then(doc => {
                CurrentData[equipo] = doc.data()
            })
    }
    for (const equipo of Object.keys(Data)) {
        Data[equipo].Jugadores.forEach((player, index) => {
            CurrentData[equipo].Jugadores[index].Asist +=
                Data[equipo].Jugadores[index].Asist
            CurrentData[equipo].Jugadores[index].Gol +=
                Data[equipo].Jugadores[index].Gol
            CurrentData[equipo].Jugadores[index].Def +=
                Data[equipo].Jugadores[index].Def
        })
    }
    Object.keys(Data).forEach(equipo => {
        db.collection(eventName)
            .doc(equipo)
            .update(CurrentData[equipo])
            .then(() => {
                console.log(`Se updateo el ${equipo} con exito`)
                Promise.resolve()
            })
            .catch(err => {
                console.log(err)
                Promise.reject(err)
            })
    })
}

async function createLeague(event, object) {
    const db = admin.firestore()
    let Data = formatObject(object)
    //Agrega los jugadores
    Object.keys(Data).forEach(equipo => {
        db.collection(event.eventNickName)
            .doc(equipo)
            .set(Data[equipo])
            .then(() => {
                console.log(`[+]Updated Succesfully ${equipo}`)
            })
            .catch(error => {
                console.log(`[*]Hubo un error: ${error}`)
            })
    })
    db.collection('Leagues')
        .doc()
        .set({
            eventNickName: event.eventNickName,
            eventName: event.eventName,
            banner: event.eventBanner,
            logo: event.eventLogo,
            isActive: true,
            teamNames: {},
        })
}

async function returnLeagueById(leagueId) {
    const db = admin.firestore()
    let leagueRef = db.collection('Leagues').doc(leagueId)
    return leagueRef
        .get()
        .then(doc => {
            if (!doc.exists) {
                return ''
            } else {
                return doc.data()
            }
        })
        .catch(err => {
            console.log('Error getting documents', err)
            return err
        })
}
async function returnActiveLeagues() {
    const Leagues = []
    const db = admin.firestore()
    try {
        await db
            .collection('Leagues')
            .where('isActive', '=', true)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.')
                    return
                }
                snapshot.forEach(doc => {
                    Leagues.push({...doc.data(), id: doc.id})
                })
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })

        return Promise.resolve(Leagues)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

async function returnLeaguesNames() {
    const Leagues = []
    const db = admin.firestore()
    try {
        await db
            .collection('Leagues')
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.')
                    return
                }

                snapshot.forEach(doc => {
                    Leagues.push(doc.data().eventNickName)
                })
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })

        return Promise.resolve(Leagues)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

async function subscribeToLeague(uid, league) {
    //Necesito buscar el id de la liga y agregarselo a el uid como un nuevo collection
    const db = admin.firestore()
    try {
        let userRef = db.collection('Users').doc(uid)
        return db
            .collection('Leagues')
            .where('eventNickName', '==', league.eventNickName)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.')
                    return
                }

                snapshot.forEach(doc => {
                    // console.log(doc.id, '=>', doc.data())
                    let data = doc.data()
                    userRef
                        .collection('participatingLeagues')
                        .doc(doc.id)
                        .set({
                            eventNickName: data.eventNickName,
                            roaster: [],
                            creadit: 150,
                            teamName: '',
                            score: 0,
                        })
                })
                return Promise.resolve('Ok')
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

async function returnSubscribeLeagues(uid) {
    const db = admin.firestore()
    let leagues = []
    let userRef = db.collection('Users').doc(uid)
    return userRef
        .collection('participatingLeagues')
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    leagues.push(doc.id)
                })
            }
            return leagues
        })
        .catch(err => {
            console.log('Error getting documents', err)
            return err
        })
}

async function checkSteps(uid, leagueId) {
    const db = admin.firestore()
    let userRef = db.collection('Users').doc(uid)
    return userRef
        .collection('participatingLeagues')
        .doc(leagueId)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return ''
            } else {
                let data = doc.data()
                if (data.teamName === '') {
                    return 'TeamNameNull'
                }
                if (data.roaster.length === 0) {
                    return 'RoasterNull'
                }
                if (data.roaster.length > 1 && data.teamName != '') {
                    return 'EverythingOk'
                }
            }
        })
        .catch(err => {
            console.log('Error getting documents', err)
            return err
        })
}

async function returnTeamNamesInLeague(leagueId) {
    const db = admin.firestore()
    let leagueRef = db.collection('Leagues').doc(leagueId)
    return leagueRef
        .get()
        .then(doc => {
            if (!doc.exists) {
                return ''
            } else {
                return doc.data().teamNames
            }
        })
        .catch(err => {
            console.log('Error getting documents', err)
            return err
        })
}
async function addTeamNameToLeague(leagueId, teamName, uid) {
    const db = admin.firestore()
    await db
        .collection('Leagues')
        .doc(leagueId)
        .update({
            teamNames: admin.firestore.FieldValue.arrayUnion({teamName: uid}),
        })
        .then(() => {
            let userRef = db.collection('Users').doc(uid)
            return userRef
                .collection('participatingLeagues')
                .doc(leagueId)
                .update({
                    teamName: teamName,
                })
        })
        .catch(err => {
            console.log('Error updating documents', err)
            return err
        })
}
function formatObject(object) {
    let Data = {}
    let jsonImportedData = object['Sheet1']
    jsonImportedData.forEach(player => {
        var team = player['Equipo']
        if (!Data.hasOwnProperty(team)) {
            Data[team] = {
                Jugadores: [
                    {
                        nombre: player.Nombre,
                        nivel: player.Nivel,
                        Asist: parseInt(player.Asist),
                        Gol: parseInt(player.Goles),
                        Def: parseInt(player.Def),
                    },
                ],
            }
        } else {
            Data[team].Jugadores.push({
                nombre: player.Nombre,
                nivel: player.Nivel,
                Asist: parseInt(player.Asist),
                Gol: parseInt(player.Goles),
                Def: parseInt(player.Def),
            })
        }
    })
    return Data
}
module.exports = {
    updateLeague,
    createLeague,
    returnLeaguesNames,
    returnActiveLeagues,
    returnLeagueById,
    subscribeToLeague,
    returnSubscribeLeagues,
    returnTeamNamesInLeague,
    addTeamNameToLeague,
    checkSteps,
}
