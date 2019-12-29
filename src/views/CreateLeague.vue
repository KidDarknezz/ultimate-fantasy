<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h3>Crear Liga</h3>
            </b-col>
        </b-row>
        <b-row v-if="Loading">
            <b-spinner variant="info" style="width: 7rem; height: 7rem;" label="Large Spinner"></b-spinner>
        </b-row>
        <b-row v-if="!Loading">
            <b-col cols="12" style="margin-top: 20px;">
                <label>Nick del Evento:</label>
                <b-form-input v-model="event.eventNickName"></b-form-input>
            </b-col>
            <b-col cols="12" style="margin-top: 20px;">
                <label>Nombre del Evento:</label>
                <b-form-input v-model="event.eventName"></b-form-input>
            </b-col>
            <b-col cols="12" style="margin-top: 20px;">
                <label>Logo del Evento:</label>
                <b-form-file
                    v-model="event.eventLogo"
                    :state="Boolean(event.eventLogo)"
                    accept=".png"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                ></b-form-file>

                <!-- <textarea class="form-control" rows="12" v-model="importedData"></textarea> -->
            </b-col>
            <b-col cols="12" style="margin-top: 20px;">
                <label>Banner del Evento:</label>
                <b-form-file
                    v-model="event.eventBanner"
                    :state="Boolean(event.eventBanner)"
                    accept=".jpg"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                ></b-form-file>

                <!-- <textarea class="form-control" rows="12" v-model="importedData"></textarea> -->
            </b-col>
            <b-col cols="12" style="margin-top: 20px;">
                <label>Excel del Evento:</label>

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
                    >CREAR EVENTO</button>
                    <b-spinner v-if="LoadingPetition" variant="success"></b-spinner>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import xlsxParser from 'xlsx-parse-json'
import * as api from '@/api/api'

import * as firebase from 'firebase/app'
import 'firebase/storage'

export default {
    data() {
        return {
            Logourl: null,
            file: null,
            leagues: [],
            Loading: false,
            event: {
                eventNickName: null,
                eventName: null,
                eventLogo: null,
                eventBanner: null,
            },
            logoFullPath: '',
            bannerFullPath: '',
            LoadingPetition: false,
        }
    },
    methods: {
        async uploadToStorage() {
            if (
                this.event.eventLogo != null &&
                this.event.eventBanner != null
            ) {
                try {
                    const ref = firebase.storage().ref()
                    let logoRef = ref.child(
                        `Leagues/${this.event.eventLogo.name}`
                    )
                    await logoRef
                        .put(this.event.eventLogo)
                        .then(snapshot => {
                            console.log(`Se subio con exito el logo`)
                        })
                        .then(async () => {
                            await logoRef.getDownloadURL().then(url => {
                                this.logoFullPath = url
                            })
                        })
                        .catch(error => {
                            console.log(
                                `Hubo un problema subiendo el logo: ${error}`
                            )
                        })
                    let bannerRef = ref.child(
                        `Leagues/${this.event.eventBanner.name}`
                    )
                    await bannerRef
                        .put(this.event.eventBanner)
                        .then(snapshot => {
                            console.log(`Se subio con exito el banner`)
                        })
                        .then(async () => {
                            await bannerRef.getDownloadURL().then(bannerurl => {
                                this.bannerFullPath = bannerurl
                            })
                        })
                        .catch(error => {
                            console.log(
                                `Hubo un problema subiendo el logo: ${error}`
                            )
                        })
                } catch (error) {
                    console.log(`Hubo un error en subir los archivos: ${error}`)
                }
            } else {
                alert('No se puede dejar ni los banners ni los logos en blanco')
            }
        },
        async ExcelToJSON(file) {
            if (this.event.eventNickName != null) {
                this.LoadingPetition = true
                await this.uploadToStorage()
                if (!this.leagues.includes(this.event.eventNickName)) {
                    xlsxParser
                        .onFileSelection(file)
                        .then(async data => {
                            await api.createleague({
                                event: {
                                    eventNickName: this.event.eventNickName,
                                    eventName: this.event.eventName,
                                    eventLogo: this.logoFullPath,
                                    eventBanner: this.bannerFullPath,
                                },
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
                        'Este nickname de la liga ya esta en uso por favor escoge otro'
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