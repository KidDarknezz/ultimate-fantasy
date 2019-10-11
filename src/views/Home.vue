<template>
	<b-container>
		<b-row style="height: 7vh">
			<b-col cols="12">
				<h3>{{ loginUser.teamName }}</h3>
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
					<b-list-group-item v-for="team in this.$store.state.allUsers">
						<span>{{ team.teamName }}</span> - 
						<span>{{ team.score }}</span><br>
						<span>{{ team.name }}</span>
					</b-list-group-item>
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
				fantasyScore: 0,
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
						this.calculateScore()
					})
			},
			calculateScore: function() {
				for (let i in this.loginUser.roster) {
					for (let j in this.$store.state.allPlayers) {
						if (this.loginUser.roster[i] == this.$store.state.allPlayers[j].playerId) {
							this.fantasyScore += this.$store.state.allPlayers[j].score
						}
					}
				}
			},
			calculateRanking: function() {
				for(let i in this.$store.state.allUsers) {
					var score = 0
					for(let j in this.$store.state.allUsers[i].roster) {
						for(let k in this.$store.state.allPlayers) {
							if (this.$store.state.allUsers[i].roster[j] == this.$store.state.allPlayers[k].playerId) {
								score += this.$store.state.allPlayers[k].score
							}
						}
					}
					this.$store.state.allUsers[i].score = score
				}
				this.sortRanking()
			},
			sortRanking: function() {
				this.$store.state.allUsers.sort((a, b) => (a.score > b.score) ? -1 : 1)
			}
		},
		beforeMount: function() {
			this.getUser()
			this.calculateRanking()
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