<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h3>Updatear Liga</h3>
            </b-col>
        </b-row>
        <b-row v-if="Loading">
            <b-spinner variant="info" style="width: 7rem; height: 7rem;" label="Large Spinner"></b-spinner>
        </b-row>
        <b-row v-if="!Loading">
            <b-col cols="12">
                <b-form-select label="Nick de la liga" v-model="eventNickName" :options="leagues"></b-form-select>
            </b-col>
            <b-col cols="12" style="margin-top: 20px;">
                <b-form-file
                    v-model="file"
                    :state="Boolean(file)"
                    accept=".xlsx"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                ></b-form-file>
                <b-button @click="ExcelToJSON(file)" variant="primary">Upload</b-button>
                <b-spinner v-if="LoadingPetition" variant="success"></b-spinner>
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
            eventNickName: null,
            LoadingPetition: false,
        }
    },
    methods: {
        async ExcelToJSON(file) {
            if (this.eventNickName != null) {
                this.LoadingPetition = true
                xlsxParser
                    .onFileSelection(file)
                    .then(async data => {
                        await api.updateleague({
                            eventNickName: this.eventNickName,
                            obj: data,
                        })
                        this.LoadingPetition = false
                        alert('Se updateo satisfactoriamente la liga')
                    })
                    .catch(error => {
                        alert('Hubo un error con el update de esta liga')
                        console.log(`Error: ${error}`)
                    })
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

<style></style>
