<template>
	<div class="container">
		<div class="row">
			<div class="col-lg-3">
				<label>New player</label>
				<input type="text" class="form-control" v-model="player.name">
				<br>
				<button class="btn btn-success" @click="registerPlayer">Submit</button>
				<hr>
				<label>New Team</label>
				<input type="text" class="form-control" v-model="team.name" style="margin-bottom: 15px;">
				<div class="form-check">
					<div v-for="player in allPlayers">
						<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
						<label class="form-check-label" for="defaultCheck1">
    						{{ player }}
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				player: {
					name: '',
				},
				allPlayers: [],
				team: {
					name: '',
					roster: []
				}
			}
		},
		methods: {
			registerPlayer: function() {
				this.$http.post('https://ultimate-fantasy-fe04f.firebaseio.com/players.json', this.player)
					.then(response => {
						console.log(response)
					}, error => {
						console.log(error)
					})
			},
			getAllPlayers: function() {
				this.$http.get('https://ultimate-fantasy-fe04f.firebaseio.com/players.json').
					then(response => {
						return response.json()
					})
					.then(data => {
						const resultArray = []
						for (let key in data) {
							resultArray.push(data[key])
						}
						this.allPlayers = resultArray
						console.log(resultArray)
					})
			}
		},
		beforeMount: function() {
			this.getAllPlayers()
		}
	}
</script>

<style>
	.container {
		margin-top: 30px;
	}
</style>