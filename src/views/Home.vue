<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-">
				<h3>Home</h3>
				<p>Hola {{ loginUser[1] }}</p>
				<p>Tu equipo es {{ loginTeam[0] }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				loginUser: [],
				loginTeam: [],
				allPlayers: [],
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
						const resultArray = []
						for (let key in data) {
							resultArray.push(data[key])
						}
						this.loginUser = resultArray
					})
			},
			getTeam: function() {
				this.$http.get(`https://ultimate-fantasy-fe04f.firebaseio.com/fantasy-teams/${localStorage.userId}.json`)
					.then(response => {
						return response.json()
					})
					.then(data => {
						const resultArray = []
						for (let key in data) {
							resultArray.push(data[key])
						}
						this.loginTeam = resultArray
						this.calculateScore()
					})
			},
			getPlayers: function() {
				this.$http.get(`https://ultimate-fantasy-fe04f.firebaseio.com/players.json`)
					.then(response => {
						return response.json()
					})
					.then(data => {
						const resultArray = []
						for (let key in data) {
							resultArray.push(data[key])
						}
						this.allPlayers = resultArray
					})
			},
			calculateScore: function() {
				console.log("hello");
			}
		},
		beforeMount: function() {
			this.getPlayers()
			this.getUser()
			this.getTeam()
		}
	}
</script>

