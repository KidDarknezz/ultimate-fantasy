<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<h3>Crear Equipo</h3>
			</div>
			<div class="col-xs-12">
				<input type="text" class="form-control" v-model="teamData.name">
			</div>
			<div class="col-xs-12">
				<div class="form-check">
					<div v-for="player in allPlayers">
						<input class="form-check-input" type="checkbox" :value="player.playerId" id="defaultCheck1">
						<label class="form-check-label" for="defaultCheck1">
    						{{ player.name }}
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
				allPlayers: [],
				teamData: {
					teamId: "",
					owner: "",
					name: "",
					roster: []
				}
			}
		},
		methods: {
			getPlayers: function() {
				this.$http.get('https://ultimate-fantasy-fe04f.firebaseio.com/players.json')
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
			}
		},
		beforeMount: function() {
			this.getPlayers()
		}
	}
</script>