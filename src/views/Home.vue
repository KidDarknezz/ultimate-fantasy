<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-">
				<h3>Home</h3>
				<p>Hola, {{ loginUser.name }}</p>
				<p>Tu equipo es: {{ loginTeam.name }}</p>
				<p>Tu Fantasy Score es de: {{ fantasyScore }}</p>
				<p>Tu roster es: {{ loginTeam.roster }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				loginUser: {},
				loginTeam: {},
				fantasyScore: 0
			}
		},
		methods: {
			getUser: function() {
				this.$http.get(`https://ultimate-fantasy-fe04f.firebaseio.com/users/${localStorage.userId}.json`)
					.then(response => {
						return response.json()
					})
					.then(data => {
						this.loginUser = data
					})
			},
			getTeam: function() {
				this.$http.get(`https://ultimate-fantasy-fe04f.firebaseio.com/fantasy-teams/${localStorage.userId}.json`)
					.then(response => {
						return response.json()
					})
					.then(data => {
						this.loginTeam = data
						this.calculateScore()
					})
			},
			calculateScore: function() {
				for (let i in this.loginTeam.roster) {
					for (let j in this.$store.state.allPlayers) {
						if(this.loginTeam.roster[i] == this.$store.state.allPlayers[j].playerId) {
							this.fantasyScore += this.$store.state.allPlayers[j].score
						}
					}
				}
			}
		},
		beforeMount: function() {
			this.getUser()
			this.getTeam()
		}
	}
</script>

