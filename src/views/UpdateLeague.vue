<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h3>Updatear Data</h3>
            </b-col>
        </b-row>
        <b-row v-if="Loading">
            <b-spinner variant="info" style="width: 7rem; height: 7rem;" label="Large Spinner"></b-spinner>
        </b-row>
        <b-row v-if="!Loading">
            <b-col cols="12">
                <b-form-select label="Nombre de la liga" v-model="eventName" :options="leagues"></b-form-select>
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
        }
    },
    methods: {
        ExcelToJSON(file) {
            if (this.eventName != null) {
                xlsxParser
                    .onFileSelection(file)
                    .then(data => {
                        api.updateleague({eventName: this.eventName, obj: data})
                    })
                    .catch(error => {
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
