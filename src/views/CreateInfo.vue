<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h3>Importar Data</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" style="margin-top: 20px;">
                <label>Nombre del Evento:</label>
                <b-form-input v-model="eventName"></b-form-input>
            </b-col>
            <b-col cols="12" style="margin-top: 20px;">
                <textarea class="form-control" rows="12" v-model="importedData"></textarea>
            </b-col>
            <b-col cols="12">
                <button class="btn btn-info" style="margin-top: 20px;" @click="importData">IMPORTAR</button>
            </b-col>
        </b-row>
        <b-row v-if="log">
            <h3>Log:</h3>
            <h2>{{log}}</h2>
        </b-row>
    </b-container>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
export default {
    data() {
        return {
            importedData: '',
            eventName: '',
            patchScore: {
                score: 0,
            },
            log: '',
        }
    },
    methods: {
        importData() {
            let Data = {}
            let jsonImportedData = JSON.parse(this.importedData)
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
            var db = firebase.firestore()
            Object.keys(Data).forEach(equipo => {
                db.collection(this.eventName)
                    .doc(equipo)
                    .set(Data[equipo])
                    .then(() => {
                        this.log += `[+]Updated Succesfully ${equipo}\n`
                    })
                    .catch(error => {
                        this.log += `[*]Hubo un error: ${error}\n`
                    })
            })
        },
    },
}
</script>

<style>
</style>