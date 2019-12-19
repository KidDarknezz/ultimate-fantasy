<template>
    <b-container>
        <b-alert
            :show="dismissCountDown"
            dismissible
            variant="danger"
            @dismissed="0"
            @dismiss-count-down="countDownChanged"
            >{{ errorMessage }}</b-alert
        >

        <b-row class="row" style="padding-top: 70px;">
            <b-col>
                <h3>
                    DEM
                    <i>tasy</i>
                </h3>
            </b-col>
        </b-row>
        <b-row style="margin-top: 50px">
            <b-col cols="12">
                <label>Correo:</label>
                <input
                    type="email"
                    class="form-control"
                    placeholder="test@test.com"
                    v-model="email"
                    @keyup.enter="login"
                />
            </b-col>
            <b-col cols="12" style="margin-top: 20px;">
                <label>Contraseña:</label>
                <input
                    type="password"
                    class="form-control"
                    placeholder="password"
                    v-model="password"
                    @keyup.enter="login"
                />
            </b-col>
        </b-row>
        <br />
        <b-row>
            <b-col cols="12">
                <button class="btn btn-success" @click="login">
                    Iniciar sesion
                </button>
                <br />
                <br />
                <router-link to="/create-account">Crear cuenta</router-link>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
    data() {
        return {
            email: '',
            password: '',
            errorCode: '',
            errorMessage: '',
            dismissSecs: 10,
            dismissCountDown: 0,
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        async login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(async () => {
                    let user = await firebase.auth().currentUser
                    await this.$store.dispatch('setCurrentUser', user)
                    this.$router.push('/')
                })
                .catch(error => {
                    // Handle Errors here.
                    this.dismissCountDown = this.dismissSecs
                    this.errorCode = error.code
                    this.errorMessage = error.message
                    // ...
                })
        },
    },
}
</script>

<style>
h3 {
    text-align: center;
}
.container {
    margin-top: 30px;
}
</style>
