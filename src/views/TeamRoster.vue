<template>
	<b-container>
		<b-row class="heading">
			<b-col cols="12">
				<router-link to="/home">B</router-link>
			</b-col>
			<b-col cols="12">
				<h3>{{ teamInfo.teamName }}</h3>
				<p style="text-align: center;">{{ teamInfo.name }}</p>
			</b-col>
		</b-row>
		<b-row class="content" v-for="roster in teamRoster">
			<b-col cols="3">
				<p style="margin-bottom: 0">{{ roster.originTeam | assignTeam }}</p>
			</b-col>
			<b-col cols="6">
				<p style="margin-bottom: 0">{{ roster.name }}</p>
			</b-col>
			<b-col cols="2">
				<p style="margin-bottom: 0">{{ roster.score }}</p>
			</b-col>
			<hr>
		</b-row>
	</b-container>
</template>

<script>
	export default {
		data: function() {
			return {
				teamInfo: {},
				teamRoster: []
			}
		},
		methods: {
			getTeam: function() {
				this.$http.get(`https://ultimate-fantasy-fe04f.firebaseio.com/users/${this.$route.params.id}.json`)
					.then(response => {
						this.teamInfo = response.data
						this.pushTeamRoster()
					})
			},
			pushTeamRoster: function() {
				for(let i in this.teamInfo.roster) {
					for(let j in this.$store.state.allPlayers) {
						if (this.teamInfo.roster[i] == this.$store.state.allPlayers[j].playerId) {
							this.teamRoster.push(this.$store.state.allPlayers[j])
						}
					}
				}
			}
		},
		beforeMount: function() {
			this.getTeam()
		},
		filters: {
			assignTeam: function(value) {
				if (value == 0) {
					return `Raiders`
				}
				if (value == 1) {
					return `Owls`
				}
				if (value == 2) {
					return `Dragons`
				}
				if (value == 3) {
					return `Eagles`
				}
			}
		}
	}
</script>