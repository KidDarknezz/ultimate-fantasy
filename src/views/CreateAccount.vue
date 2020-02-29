<template>
    <div>
        <div class="header">
            <h2 style="font-size: 25px; padding-top: 15px; margin-left: 15px;">Crea tu cuenta</h2>
        </div>
        <b-container>
            <b-alert
                :show="dismissCountDown"
                dismissible
                variant="danger"
                @dismissed="0"
                @dismiss-count-down="countDownChanged"
            >{{ errorMessage }}</b-alert>
            <br />
            <b-row>
                <b-col cols="12">
                    <label>Nombre:</label>
                    <input type="text" class="form-control" placeholder="John Doe" v-model="name" />
                    <br />
                    <label>Email:</label>
                    <input
                        type="email"
                        class="form-control"
                        placeholder="john.doe@test.com"
                        v-model="email"
                    />
                    <br />
                    <label>Contraseña</label>
                    <input
                        type="password"
                        class="form-control"
                        placeholder="**********"
                        v-model="password"
                    />
                    <!-- <label>Nombra tu equipo fantasy</label>
                    <input type="text" class="form-control" v-model="teamName" />
                    <br />-->
                    <br />
                    <button @click="createUserAccount" class="dem-fantasy-cta">Crear cuenta</button>
                </b-col>
            </b-row>
        </b-container>

        <!-- BOTTOM MENU -->
        <NavBar></NavBar>
        <!-- END BOTTOM MENU -->
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
    components: {
        NavBar,
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            teamName: '',
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
            if (this.name == '' || this.email == '' || this.password == '') {
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
                                userName: this.name,
                                userEmail: this.email,
                                isAdmin: false,
                            })
                            .then(() => {
                                alert('Usuario creado con exito')
                                this.$router.push('/')
                            })
                            .catch(error => {
                                console.error('Error adding document: ', error)
                            })
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
    },
}
</script>
