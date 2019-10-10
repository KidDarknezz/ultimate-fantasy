<template>
	<b-container>
		<b-row>
			<b-col cols="12">
				<h3>Importar Data</h3>
			</b-col>
		</b-row>
		<b-row>
			<b-col cols="12" style="margin-top: 20px;">
				<textarea class="form-control" rows="12" v-model="importedData"></textarea>
			</b-col>
			<b-col cols="12">
				<button class="btn btn-info" style="margin-top: 20px;" @click="importData">IMPORTAR</button>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	export default {
		data: function() {
			return{
				importedData: '',
				patchScore: {
					score: 0
				}
			}
		},
		methods: {
			importData: function() {
				let jsonImportedData = JSON.parse(this.importedData)
				for(let j in jsonImportedData) {
					for (let i in this.$store.state.allPlayers) {
						if (this.$store.state.allPlayers[i].playerId == jsonImportedData[j].playerId) {
							this.patchScore.score = this.$store.state.allPlayers[i].score + jsonImportedData[j].score
						}
					}
					this.patchNewScore(jsonImportedData[j].playerId)
				}
				
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
						this.$store.state.allPlayers = resultArray
					})
			},
			patchNewScore: function(playerId) {
				this.$http.patch(`https://ultimate-fantasy-fe04f.firebaseio.com/players/${playerId}.json`, this.patchScore)
				.then(response => {
					console.log(response)
				})
				.then(err => {
					console.log(err)
				})
			}
		},
		beforeMount: function() {
			this.getPlayers()
		}
	}
</script>

<style>

</style>