<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
export default {
    async mounted() {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                await this.$store.dispatch('setCurrentUser', user)
            }
        })
    },
}
</script>