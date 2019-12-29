const admin = require('firebase-admin')

async function updateLeague(eventName, object) {
    const db = admin.firestore()
    let Data = await formatObject(object)
    let CurrentData = {}
    for await (const equipo of Object.keys(Data)) {
        await db
            .collection(eventName)
            .doc(equipo)
            .get()
            .then(doc => {
                CurrentData[equipo] = doc.data()
            })
    }
    for await (const equipo of Object.keys(Data)) {
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

async function createLeague(eventName, object) {
    const db = admin.firestore()
    let Data = formatObject(object)
    //Agrega los jugadores
    Object.keys(Data).forEach(equipo => {
        db.collection(eventName)
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
            eventName: eventName,
            banner: 'https://via.placeholder.com/150',
        })
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
                    Leagues.push(doc.data().eventName)
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
}
