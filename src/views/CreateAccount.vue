<template>
    <b-container>
        <b-alert
            :show="dismissCountDown"
            dismissible
            variant="danger"
            @dismissed="0"
            @dismiss-count-down="countDownChanged"
        >{{ errorMessage }}</b-alert>
        <b-row class="heading">
            <b-col cols="12">
                <h3>Crear cuenta</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <label>Nombre:</label>
                <input type="text" class="form-control" placeholder="John Doe" v-model="name" />
                <label>Email:</label>
                <input
                    type="email"
                    class="form-control"
                    placeholder="john.doe@test.com"
                    v-model="email"
                />
                <label>Contraseña</label>
                <input
                    type="password"
                    class="form-control"
                    placeholder="password"
                    v-model="password"
                />
                <label>Nombra tu equipo fantasy</label>
                <input type="text" class="form-control" v-model="teamName" />
                <br />
                <button @click="createUserAccount" class="btn btn-success">Seleccionar roster</button>
            </b-col>
        </b-row>

        <!-- <b-row class="heading">
            <b-col cols="12">
                <h3 v-if="!step">Crear cuenta</h3>
                <h3 v-if="step">Selecciona tu roster</h3>
            </b-col>
        </b-row>
        <account-form v-if="!step" class="content" @formSuccess="createUserAccount"></account-form>
        <pick-roster v-if="step" class="content"></pick-roster>-->
    </b-container>
</template>

<script>
import AccountForm from '@/components/AccountForm.vue'
import PickRoster from '@/components/PickRoster.vue'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
    components: {
        'account-form': AccountForm,
        'pick-roster': PickRoster,
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            teamName: '',
            // step: false,
            // originTeams: [],
            errorCode: '',
            errorMessage: '',
            dismissSecs: 10,
            dismissCountDown: 0,
        }
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        async createUserAccount() {
            if (
                this.name == '' ||
                this.email == '' ||
                this.password == '' ||
                this.teamName == ''
            ) {
                alert('Porfavor llena todos los campos')
            } else {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(async () => {
                        let user = await firebase.auth().currentUser
                        await this.$store.dispatch('setCurrentUser', user)
                        var db = firebase.firestore()
                        db.collection('Users')
                            .doc(user.uid)
                            .set({
                                teamName: this.teamName,
                                userName: this.name,
                                userEmail: this.email,
                                userCredit: 300,
                            })
                            .then(() => {
                                alert('Usuario creado con exito')
                                this.$router.push('/')
                            })
                            .catch(error => {
                                console.error('Error adding document: ', error)
                            })
                        // this.step = true
                    })
                    .catch(error => {
                        // Handle Errors here.
                        this.dismissCountDown = this.dismissSecs
                        this.errorCode = error.code
                        this.errorMessage = error.message
                        // ...
                    })
            }
        },
        // getAllOriginTeams() {
        //     this.$http
        //         .get(`https://ultimate-fantasy-fe04f.firebaseio.com/teams.json`)
        //         .then(response => {
        //             return response.json()
        //         })
        //         .then(data => {
        //             const resultArray = []
        //             for (let key in data) {
        //                 resultArray.push(data[key])
        //             }
        //             this.$store.state.allOriginTeams = resultArray
        //         })
        // },
    },
    // beforeMount() {
    //     this.getAllOriginTeams()
    // },
}
</script>