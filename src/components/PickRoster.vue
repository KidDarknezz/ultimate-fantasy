<template>
	<b-row>
		<b-col cols="12">
			<p>Selecciona 3 jugadores por equipo</p>
			<p>{{ this.$store.state.allOriginTeams[teamStep].name }}</p>
			<b-form-group>
				<b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2" stacked>
					<b-form-checkbox :value="player.playerId" v-for="player in options" v-if="player.originTeam == teamStep">{{ player.name }}</b-form-checkbox>
				</b-form-checkbox-group>
			</b-form-group>
			<button class="btn btn-success" @click="checkPicks" v-if="teamStep != (this.$store.state.allOriginTeams.length - 1)">Siguiente</button>
			<button class="btn btn-success" @click="createAccount" v-if="teamStep == (this.$store.state.allOriginTeams.length - 1)">Finalizar</button>
		</b-col>
	</b-row>
</template>

<script>
  export default {
    data() {
		return {
			counter: 0,
			selected: [], // Must be an array reference!
			options: this.$store.state.allPlayers,
			teamStep: 0,
			counter: 0
		}
	},
	methods: {
		checkPicks: function() {
			if (this.teamStep < this.$store.state.allOriginTeams.length) {
				if ((this.selected.length % 3) == 0) {
					this.teamStep++
					console.log(this.$store.state.allOriginTeams.length)
				}
				if ((this.selected.length % 3) != 0) {
					alert("Seleccione 3")
				}	
			} 
		},
		createAccount: function() {
			this.$store.state.newUser.roster = (this.selected)
			this.$http.post(`https://ultimate-fantasy-fe04f.firebaseio.com/users.json`, this.$store.state.newUser)
				.then(response => {
					console.log(response)
					alert("Tu equipo se ha creado con exito, puedes iniciar sesion")
					this.$router.push('/')
				})
				.then(err => {
					console.log(err)
				})
			console.log(this.$store.state.newUser)
		}
	}
  }
</script>

<style>

</style>