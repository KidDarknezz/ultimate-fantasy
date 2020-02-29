<template>
    <div class="row-fluid header" @click="logout">
        <img
            src="@/assets/user-placeholder.jpg"
            class="img-fluid"
            style="float: left; margin-right: 15px;"
        />
        <h2 style="font-size: 25px; padding-top: 15px">{{user.userName}}</h2>
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

