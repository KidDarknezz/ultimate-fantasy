<template>
	<b-container>
		<b-row style="height: 7vh">
			<b-col cols="12">
				<h3>{{ loginTeam.name }}</h3>
			</b-col>
		</b-row>
		<b-row style="height: 10vh">
			<b-col cols="12">
				<h4 class="score">Puntos<br>{{ fantasyScore }}</h4>
			</b-col>
		</b-row>
		<b-row style="height: 75vh">
			<b-col cols="12">
				<p>Ranking</p>
			</b-col>			
			<b-col cols="12" class="teams-list">
				<b-list-group>
					<b-list-group-item v-for="team in allTeams">{{ team.name }} - <span>0000</span></b-list-group-item>
				</b-list-group>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	export default {
		data: function() {
			return {
				loginUser: {},
				loginTeam: {},
				fantasyScore: 0,
				allTeams: []
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
			getAllTeams: function() {
				this.$http.get(`https://ultimate-fantasy-fe04f.firebaseio.com/fantasy-teams.json`)
					.then(response => {
						return response.json()
					})
					.then(data => {
						const resultArray = []
						for (let key in data) {
							resultArray.push(data[key])
						}
						this.allTeams = resultArray
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
			this.getAllTeams()
		}
	}
</script>

<style>
	.score {
		text-align: center;
	}

	.teams-list {
		height: 90%;
		overflow: scroll;
	}
</style>