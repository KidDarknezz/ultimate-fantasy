<template>
    <b-container>
        <b-row class="heading">
            <b-col cols="12">
                <h3>{{ loginUser.teamName }}</h3>
            </b-col>
            <b-col cols="12">
                <h4 class="score">
                    <span>Puntos</span>
                    <br />
                    <!-- {{ fantasyScore }} -->
                </h4>
            </b-col>
            <b-button @click="logout()" variant="danger">Log Out</b-button>
        </b-row>
        <b-row v-if="admin">
            <b-col cols="12">
                <h4>YOu are an admin</h4>
                <router-link to="/create-league">Crear Info</router-link>
                <br />
                <router-link to="/create-roster">Crear roster</router-link>
                <br />
                <router-link to="/update-league">Update Info</router-link>
            </b-col>
        </b-row>
        <!-- <b-row class="content">
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
        </b-row>-->
    </b-container>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
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
        admin() {
            return this.$store.getters.isAdmin
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
        getUser() {
            this.$http
                .get(
                    `https://ultimate-fantasy-fe04f.firebaseio.com/users/${localStorage.userId}.json`
                )
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.loginUser = data
                    this.calculateScore()
                })
        },
        calculateScore() {
            for (let i in this.loginUser.roster) {
                for (let j in this.$store.state.allPlayers) {
                    if (
                        this.loginUser.roster[i] ==
                        this.$store.state.allPlayers[j].playerId
                    ) {
                        this.fantasyScore += this.$store.state.allPlayers[
                            j
                        ].score
                    }
                }
            }
        },
        calculateRanking() {
            for (let i in this.$store.state.allUsers) {
                var score = 0
                for (let j in this.$store.state.allUsers[i].roster) {
                    for (let k in this.$store.state.allPlayers) {
                        if (
                            this.$store.state.allUsers[i].roster[j] ==
                            this.$store.state.allPlayers[k].playerId
                        ) {
                            score += this.$store.state.allPlayers[k].score
                        }
                    }
                }
                this.$store.state.allUsers[i].score = score
            }
            this.sortRanking()
        },
        sortRanking() {
            this.$store.state.allUsers.sort((a, b) =>
                a.score > b.score ? -1 : 1
            )
        },
    },
    async beforeMount() {
        var db = firebase.firestore()
        db.collection('Users')
            .doc(this.uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    this.rosterPicked = doc.data().rosterPicked
                }
            })
            .catch(function(error) {
                console.log('Error getting document:', error)
            })
    },
}
</script>

<style></style>
