<template>
	<b-row>
		<b-col cols="12">
			<b-form-group>
				<b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2" stacked>
					<b-form-checkbox :value="player.playerId" v-for="player in options">{{ player.name }}</b-form-checkbox>
					<!-- <b-form-checkbox value="apple">Apple</b-form-checkbox>
					<b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
					<b-form-checkbox value="grape">Grape</b-form-checkbox> -->
				</b-form-checkbox-group>
			</b-form-group>
			<div>Selected: <strong>{{ selected }}</strong></div>
			<button class="btn btn-success" @click="checkPicks">Check</button>
		</b-col>
	</b-row>
</template>

<script>
  export default {
    data() {
		return {
			counter: 0,
			selected: [], // Must be an array reference!
			options: this.$store.state.allPlayers
		}
	},
	methods: {
		checkPicks: function() {
			// if(this.selected.length >= 4 || this.selected.length <= 2) {
			// 	alert("Es olbigatorio seleccionar 3 jugadores")
			// }
			this.$store.state.newUser.userId = this.$store.state.allPlayers.length
			this.$store.state.newUser.roster = (this.selected)
			console.log(this.$store.state.newUser)
			this.$http.post(`https://ultimate-fantasy-fe04f.firebaseio.com/users.json`, this.$store.state.newUser)
				.then(response => {
					console.log(response)
				})
				.then(err => {
					console.log(err)
				})
		}
	}
  }
</script>

<style>

</style>