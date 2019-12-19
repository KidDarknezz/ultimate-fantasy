<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
export default {
    computed: {
        uid() {
            return this.$store.getters.uid
        },
    },
    async mounted() {
        var db = firebase.firestore()
        db.collection('Users')
            .doc(this.uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    this.$store.commit('setUser', doc.data())
                    this.$store.commit('setAdmin', doc.data().isAdmin)
                }
            })
            .catch(function(error) {
                console.log('Error getting document:', error)
            })
    },
}
</script>
