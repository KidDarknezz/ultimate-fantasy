<template>
    <b-container>
        <b-row class="heading">
            <b-col cols="12">
                <h3 v-if="!step">Crear cuenta</h3>
                <h3 v-if="step">Selecciona tu roster</h3>
            </b-col>
        </b-row>
        <account-form v-if="!step" class="content" @formSuccess="createUserAccount"></account-form>
        <pick-roster v-if="step" class="content"></pick-roster>
    </b-container>
</template>

<script>
import AccountForm from '@/components/AccountForm.vue'
import PickRoster from '@/components/PickRoster.vue'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
    components: {
        'account-form': AccountForm,
        'pick-roster': PickRoster,
    },
    data() {
        return {
            step: false,
            originTeams: [],
        }
    },
    methods: {
        createUserAccount(user) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then(alert('Account Created Successfully!'))
                .then(() => {
                    this.step = true
                })
                .catch(error => {
                    // Handle Errors here.
                    console.log(error)
                    var errorCode = error.code
                    var errorMessage = error.message
                    // ...
                })
        },
        getAllOriginTeams() {
            this.$http
                .get(`https://ultimate-fantasy-fe04f.firebaseio.com/teams.json`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const resultArray = []
                    for (let key in data) {
                        resultArray.push(data[key])
                    }
                    this.$store.state.allOriginTeams = resultArray
                })
        },
    },
    beforeMount() {
        this.getAllOriginTeams()
    },
}
</script>