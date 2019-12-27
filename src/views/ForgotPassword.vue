<template>
    <div>
        <div class="header">
            <h2 style="font-size: 25px; padding-top: 15px; margin-left: 15px;">Inicia sesion</h2>
        </div>
        <b-container>
            <b-alert
                :show="dismissCountDown"
                dismissible
                variant="danger"
                @dismissed="0"
                @dismiss-count-down="countDownChanged"
            >{{ errorMessage }}</b-alert>
            <b-row class="row">
                <b-col cols="4" offset="4">
                    <br />
                    <img src="@/assets/DEM_White_PNG.png" class="img-fluid" />
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
                        @keyup.enter="resetPassword"
                    />
                </b-col>
            </b-row>
            <b-row style="margin-top: 45px;">
                <b-col cols="12">
                    <button class="dem-fantasy-cta" @click="resetPassword()">Resetear Contraseña</button>
                </b-col>
            </b-row>
        </b-container>
        <div class="dem-fantasy-bottom-menu">
            <router-link to="/create-account" class="dem-fantasy-create-acc-cta">Crear cuenta</router-link>
        </div>
    </div>
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
        async resetPassword() {
            if (this.email === '') {
                alert('Por Favor introduce un email!')
            } else {
                firebase
                    .auth()
                    .sendPasswordResetEmail(this.email)
                    .then(function() {
                        alert(
                            'Te hemos enviado el email, por favor revisa tu correo'
                        )
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        this.dismissCountDown = this.dismissSecs
                        this.errorCode = error.code
                        this.errorMessage = error.message
                        // ...
                    })
            }
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
