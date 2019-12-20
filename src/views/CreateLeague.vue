<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h3>Importar Data</h3>
            </b-col>
        </b-row>
        <b-row v-if="Loading">
            <b-spinner variant="info" style="width: 7rem; height: 7rem;" label="Large Spinner"></b-spinner>
        </b-row>
        <b-row v-if="!Loading">
            <b-col cols="12" style="margin-top: 20px;">
                <label>Nombre del Evento:</label>
                <b-form-input v-model="eventName"></b-form-input>
            </b-col>
            <b-col cols="12" style="margin-top: 20px;">
                <b-form-file
                    v-model="file"
                    :state="Boolean(file)"
                    accept=".xlsx"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                ></b-form-file>
                <!-- <textarea class="form-control" rows="12" v-model="importedData"></textarea> -->
            </b-col>
            <b-col cols="12">
                <div class="text-center mb-3 d-flex justify-content-between">
                    <button
                        class="btn btn-info"
                        style="margin-top: 20px;"
                        @click="ExcelToJSON(file)"
                    >IMPORTAR</button>
                    <b-spinner v-if="LoadingPetition" variant="success"></b-spinner>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import xlsxParser from 'xlsx-parse-json'
import * as api from '@/api/api'

export default {
    data() {
        return {
            file: null,
            leagues: [],
            Loading: false,
            eventName: null,
            LoadingPetition: false,
        }
    },
    methods: {
        async ExcelToJSON(file) {
            if (this.eventName != null) {
                this.LoadingPetition = true
                if (!this.leagues.includes(this.eventName)) {
                    xlsxParser
                        .onFileSelection(file)
                        .then(async data => {
                            await api.createleague({
                                eventName: this.eventName,
                                obj: data,
                            })
                            this.LoadingPetition = false
                            alert('Se creo satisfactoriamente la liga')
                        })
                        .catch(error => {
                            this.LoadingPetition = false
                            alert('Hubo un error con la creacion de esta liga')
                            console.log(`Error: ${error}`)
                        })
                } else {
                    this.LoadingPetition = false
                    alert(
                        'Este nombre de la liga ya esta en uso por favor escoge otro'
                    )
                }
            } else {
                alert('Por favor escoger un nombre de la Liga')
            }
        },
    },
    async beforeMount() {
        this.Loading = true
        api.returnleaguenames().then(leagues => {
            this.leagues = leagues.data['status']
            this.Loading = false
        })
    },
}
</script>

<style>
</style>