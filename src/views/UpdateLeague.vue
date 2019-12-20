<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h3>Updatear Data</h3>
            </b-col>
        </b-row>
        <b-row>
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
        }
    },
    methods: {
        ExcelToJSON(file) {
            xlsxParser
                .onFileSelection(file)
                .then(data => {
                    api.updateleague(data)
                })
                .catch(error => {
                    console.log(`Error: ${error}`)
                })
        },
    },
}
</script>

<style></style>
