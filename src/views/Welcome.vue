<template>
    <div>
        <b-row v-if="Loading">
            <b-spinner variant="info" style="width: 7rem; height: 7rem;" label="Large Spinner"></b-spinner>
        </b-row>
        <div v-if="!Loading">
            <!-- HEADER -->
            <div class="row-fluid header" @click="logout">
                <img
                    src="@/assets/user-placeholder.jpg"
                    class="img-fluid"
                    style="float: left; margin-right: 15px;"
                />
                <h2 style="font-size: 25px; padding-top: 15px">{{user.userName}}</h2>
            </div>
            <!-- END HEADER -->

            <!-- WELCOME MSG -->
            <b-container style="text-align: center;">
                <b-row>
                    <b-col cols="12">
                        <h2>¡Bienvenido!</h2>
                        <br />
                    </b-col>
                    <b-col cols="12">
                        <p>Selecciona tu primer Fantasy de la lista para continuar</p>
                    </b-col>
                </b-row>
            </b-container>
            <!-- END WELCOME MSG -->
            <br />
            <!-- FANTASY LIST -->
            <b-container
                v-for="(league, index) in leagues"
                :key="index"
                class="dem-fantasy-tile"
                :style="{ backgroundImage: 'url(' + league.banner + ')' }"
            >
                <b-row>
                    <b-col cols="2">
                        <img :src="league.logo" style="padding-top: 10px;" class="img-fluid" />
                    </b-col>
                    <b-col cols="10">
                        <h4>{{league.eventName}}</h4>
                    </b-col>
                    <b-col cols="12">
                        <button
                            v-if="!checkIfSubscribed(league.id)"
                            @click="subscribeToLeague(league)"
                            class="dem-fantasy-cta"
                        >Unirse</button>
                        <button v-if="checkIfSubscribed(league.id)" class="dem-fantasy-cta">Meterse</button>
                    </b-col>
                </b-row>
            </b-container>
            <br />
            <br />
            <b-container>
                <b-row v-if="admin">
                    <b-col cols="12">
                        <h4>You are an admin</h4>
                        <router-link to="/create-league">Crear Info</router-link>
                        <br />
                        <router-link to="/create-roster">Crear roster</router-link>
                        <br />
                        <router-link to="/update-league">Update Info</router-link>
                    </b-col>
                </b-row>
            </b-container>
            <!-- END FANTASY LIST -->
        </div>
    </div>
</template>
<script>
import * as api from '@/api/api'

import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
    data() {
        return {
            Loading: false,
            leagues: [],
        }
    },
    computed: {
        admin() {
            return this.$store.getters.isAdmin
        },
        user() {
            return this.$store.getters.user
        },
        uid() {
            return this.$store.getters.uid
        },
        participatingLeagues() {
            return this.$store.getters.participatingLeagues
        },
    },
    methods: {
        checkIfSubscribed(leagueId) {
            if (this.participatingLeagues.size > 0) {
                return this.participatingLeagues.forEach(league => {
                    if (league.id === leagueId) {
                        console.log('true')
                        return true
                    } else {
                        return false
                    }
                })
            } else {
                return false
            }
        },
        async logout() {
            firebase
                .auth()
                .signOut()
                .then(async () => {
                    await this.$store.dispatch('UserLogout')
                    this.$router.push('/login')
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async subscribeToLeague(league) {
            await api
                .subscribetoleague({uid: this.uid, league})
                .then(response => {
                    this.$store.dispatch('getParticipatingLeagues', this.uid)
                })
        },
    },
    async beforeMount() {
        this.Loading = true
        api.returnactiveleagues().then(leagues => {
            this.leagues = leagues.data['status']
            this.$store.dispatch('getParticipatingLeagues', this.uid)
            this.Loading = false
        })
    },
}
</script>