<template>
    <div>
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

        <!-- CREATE TEAM NAME -->
        <b-container>
            <b-row>
                <b-col cols="12">
                    <label>Ponle nombre a tu equipo fantasy:</label>
                    <input type="text" class="form-control" v-model="teamName" />
                </b-col>
                <button @click="addTeamName(teamName)" class="dem-fantasy-cta">Meterse</button>
            </b-row>
        </b-container>
        <!-- END CREATE TEAM NAME -->

        <!-- INSTRUCTIONS -->
        <b-container>
            <b-row>
                <b-col cols="12">
                    <h3 style="text-align: left;">Instrucciones</h3>
                    <br />
                    <ol>
                        <li>Ponle un nombre a tu equipo</li>
                        <li>Selecciona los jugadores para tu roster</li>
                        <li>bla bla bla....</li>
                        <li>bla bla bla....</li>
                        <li>bla bla bla....</li>
                        <li>bla bla bla....</li>
                        <li>bla bla bla....</li>
                        <li>bla bla bla....</li>
                    </ol>
                </b-col>
            </b-row>
        </b-container>
        <!-- END INSTRUCTIONS -->

        <!-- BOTTOM MENU -->
        <div class="dem-fantasy-bottom-menu">
            <router-link to="/" class="dem-fantasy-create-acc-cta">AYUDA</router-link>
            <router-link to="/" class="dem-fantasy-create-acc-cta">ATRAS</router-link>
        </div>
        <!-- END BOTTOM MENU -->
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
            teamName: '',
            teamNames: [],
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
    },
    methods: {
        async addTeamName(teamName) {
            if (teamName != '') {
                if (!this.teamNames.includes(teamName)) {
                    api.addteamnametoleaague({
                        leagueId: this.$route.params.leagueId,
                        teamName: teamName,
                        uid: this.uid,
                    }).then(response => {
                        this.$router.push({
                            path: `/createroster/${this.$route.params.leagueId}`,
                        })
                    })
                } else {
                    alert(
                        'Otro Jugador ya tiene este nombre de equipo, porfavor escoje otro'
                    )
                }
            } else {
                alert('Porfavor Introduce un nombre para tu equipo')
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
    },
    async beforeMount() {
        this.Loading = true
        let leagueId = this.$route.params.leagueId
        api.returnteamnamesinleaague({leagueId: leagueId}).then(
            async response => {
                response.data.status.forEach(element => {
                    this.teamNames.push(element)
                })
            }
        )
        this.Loading = false
    },
}
</script>