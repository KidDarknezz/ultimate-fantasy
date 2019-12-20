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
                <button
                    class="btn btn-info"
                    style="margin-top: 20px;"
                    @click="ExcelToJSON(file)"
                >IMPORTAR</button>
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
            eventName: '',
            file: null,
        }
    },
    methods: {
        ExcelToJSON(file) {
            xlsxParser
                .onFileSelection(file)
                .then(data => {
                    api.createleague({eventName: this.eventName, obj: data})
                })
                .catch(error => {
                    console.log(`Error: ${error}`)
                })
        },
    },
}
</script>

<style>
</style>