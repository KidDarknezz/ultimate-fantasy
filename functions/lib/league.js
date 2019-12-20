const admin = require('firebase-admin')

async function updateScores(object) {
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
    console.log(JSON.stringify(CurrentData))
}

async function getCurrentPlayers(Liga, Equipo) {
    const db = admin.firestore()
}
module.exports = {
    updateScores,
}
