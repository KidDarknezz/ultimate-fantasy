<template>
    <div>
        <!-- HEADER -->
        <div class="row-fluid header" @click="logout">
            <img
                src="@/assets/user-placeholder.jpg"
                class="img-fluid"
                style="float: left; margin-right: 15px;"
            />
            <h2 style="font-size: 25px; padding-top: 15px">Alejandro Millan</h2>
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
            class="dem-fantasy-tile"
            :style="{ backgroundImage: 'url(' + require('@/assets/IMG_9556.jpg') + ')' }"
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
                <b-col cols="12">
                    <button class="dem-fantasy-cta">Participar</button>
                </b-col>
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
        </b-container>
        <!-- END FANTASY LIST -->
    </div>
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
export default {
    computed: {
        admin() {
            return this.$store.getters.isAdmin
        },
        user() {
            return this.$store.getters.user
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