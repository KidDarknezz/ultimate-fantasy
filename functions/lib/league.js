const admin = require('firebase-admin')

async function updateLeague(object) {
    const db = admin.firestore()
    let Data = {}
    let name = 'CDS2020'
    let CurrentData = {}
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
    for await (const equipo of Object.keys(Data)) {
        await db
            .collection(name)
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
        db.collection(name)
            .doc(equipo)
            .update(CurrentData[equipo])
            .then(() => {
                Promise.resolve()
            })
            .catch(err => {
                Promise.reject(err)
            })
    })
}

async function createLeague(eventName, object) {
    const db = admin.firestore()
    let Data = formatObject(object)
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
        .doc(eventName)
        .set({
            banner: 'https://via.placeholder.com/150',
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
}
