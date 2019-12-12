<template>
    <b-row>
        <b-col cols="12">
            <p style="text-align: center;">
                Selecciona 3 jugadores del equipo
                <strong>{{
                    this.$store.state.allOriginTeams[teamStep].name
                }}</strong>
            </p>
            <!-- <p>{{ this.$store.state.allOriginTeams[teamStep].name }}</p> -->
            <b-img
                :src="logos[teamStep]"
                center
                fluid
                style="width: 25%; margin-bottom: 20px;"
            ></b-img>
            <b-form-group>
                <b-form-checkbox-group
                    id="checkbox-group-2"
                    v-model="selected"
                    name="flavour-2"
                    stacked
                >
                    <b-form-checkbox
                        style="margin-bottom: 8px;"
                        :value="player.playerId"
                        v-for="player in options"
                        v-if="player.originTeam == teamStep"
                        :key="player"
                        >{{ player.name }}</b-form-checkbox
                    >
                </b-form-checkbox-group>
            </b-form-group>
            <button
                style="margin-bottom: 20px"
                class="btn btn-success"
                @click="checkPicks"
                v-if="teamStep != this.$store.state.allOriginTeams.length - 1"
            >
                Siguiente
            </button>
            <button
                style="margin-bottom: 20px"
                class="btn btn-success"
                @click="createAccount"
                v-if="teamStep == this.$store.state.allOriginTeams.length - 1"
            >
                Finalizar
            </button>
        </b-col>
    </b-row>
</template>

<script>
export default {
    data() {
        return {
            selected: [],
            options: this.$store.state.allPlayers,
            teamStep: 0,
            rosterCounter: 3,
            logos: [
                'https://ultiranks.com/wp-content/uploads/2019/09/Raiders_logo.png',
                'https://ultiranks.com/wp-content/uploads/2019/09/Owls_logo.png',
                'https://ultiranks.com/wp-content/uploads/2019/09/Dragons_logo.png',
                'https://ultiranks.com/wp-content/uploads/2019/09/Eagles_logo.png',
            ],
        }
    },
    methods: {
        checkPicks: function() {
            if (this.teamStep < this.$store.state.allOriginTeams.length) {
                if (
                    this.selected.length % this.rosterCounter == 0 &&
                    this.selected.length > 0
                ) {
                    this.teamStep++
                    this.rosterCounter += 3
                    return true
                } else {
                    alert('Seleccione 3')
                }
            }
        },
        createAccount: function() {
            this.$store.state.newUser.roster = this.selected
            let sendData = this.checkPicks()
            if (sendData) {
                this.$http
                    .post(
                        `https://ultimate-fantasy-fe04f.firebaseio.com/users.json`,
                        this.$store.state.newUser
                    )
                    .then(response => {
                        console.log(response)
                        alert(
                            'Tu equipo se ha creado con exito, puedes iniciar sesion'
                        )
                        this.$router.push('/')
                    })
                    .then(err => {
                        console.log(err)
                    })
            }
        },
    },
}
</script>

<style></style>
