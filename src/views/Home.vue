<template>
    <div>
        <!-- HEADER -->
        <Header></Header>
        <!-- END HEADER -->

        <!-- SUB HEADER -->
        <b-container
            style="margin: 0; padding-top: 10px; padding-bottom: 10px; background-color: #000;"
        >
            <b-row>
                <b-col cols="2">
                    <img src="@/assets/cds.png" style="padding-top: 10px;" class="img-fluid" />
                </b-col>
                <b-col cols="10">
                    <h4>
                        Liga de Verano
                        <br />Ciudad del Saber 2020
                    </h4>
                </b-col>
            </b-row>
        </b-container>
        <!-- END SUBHEADER -->

        <!-- SCORE & RANKING -->
        <b-container>
            <b-row>
                <b-col cols="6">
                    <p style="font-size: 40px; text-align: center; color: #FFBE0A">58 Pts</p>
                </b-col>
                <b-col cols="6">
                    <p style="font-size: 40px; text-align: center;">4to</p>
                </b-col>
            </b-row>
        </b-container>
        <!-- END SCORE & RANKING -->
        <br />
        <!-- CONTENT -->
        <b-container class="dem-fantasy-tile dem-fantasy-ranking">
            <b-row>
                <b-col cols="12">
                    <p>RANKING</p>
                </b-col>
            </b-row>
        </b-container>
        <b-container class="dem-fantasy-tile dem-fantasy-myteam">
            <b-row>
                <b-col cols="12">
                    <p>MI EQUIPO</p>
                </b-col>
            </b-row>
        </b-container>
        <!-- END CONTENT -->

        <!-- BOTTOM MENU -->
        <NavBar></NavBar>
        <!-- END BOTTOM MENU -->

        <!--         <b-container>
            <b-row class="heading">
                <b-col cols="12">
                    <h3>{{ loginUser.teamName }}</h3>
                </b-col>
                <b-col cols="12">
                    <h4 class="score">
                        <span>Puntos</span>
                        <br />
                        {{ fantasyScore }} 
                    </h4>
                </b-col>
                <b-button @click="logout()" variant="danger">Log Out</b-button>
            </b-row>
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
             <b-row class="content">
                <b-col cols="12">
                    <p style="font-weight: 700;">Ranking</p>
                </b-col>
                <b-col cols="12" class="teams-list" style="margin-bottom: 20px;">
                    <b-list-group>
                        <router-link
                            :to="`/team/${team.id}`"
                            tag="b-list-group-item"
                            v-for="(team, index) in this.$store.state.allUsers"
                            :key="index"
                        >
                            <span class="ranking-name">{{ index + 1 }}. {{ team.teamName }}</span>
                            -
                            <span class="ranking-score">{{ team.score }}</span>
                            Pts.
                            <br />
                            <span class="ranking-owner">{{ team.name }}</span>
                        </router-link>
                    </b-list-group>
                </b-col>
            </b-row>
        </b-container>-->
    </div>
</template>

<script>
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'

import * as firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

export default {
    components: {
        Header,
        NavBar,
    },
    data() {
        return {
            loginUser: {},
            fantasyScore: 0,
            rosterPicked: null,
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        uid() {
            return this.$store.getters.uid
        },
    },
    methods: {
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
}
</script>

<style></style>
