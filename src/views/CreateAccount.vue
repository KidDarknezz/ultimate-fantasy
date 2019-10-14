<template>
	<b-container>
		<b-row class="heading">
			<b-col cols="12">
				<h3 v-if="!step">Crear cuenta</h3>
				<h3 v-if="step">Selecciona tu roster</h3>
			</b-col>
		</b-row>
		<account-form v-if="!step" class="content"></account-form>
		<button @click="validateForm" class="btn btn-success" v-if="!step">Seleccionar roster</button>
		<pick-roster v-if="step" class="content"></pick-roster>
	</b-container>
</template>

<script>
	import AccountForm from '@/components/AccountForm.vue'
	import PickRoster from '@/components/PickRoster.vue'
	export default {
		data: function() {
			return {
				step: false,
				originTeams: []
			}
		},
		methods: {
			getAllOriginTeams: function() {
				this.$http.get(`https://ultimate-fantasy-fe04f.firebaseio.com/teams.json`)
					.then(response => {
						return response.json()
					})
					.then(data => {
						const resultArray = []
						for (let key in data) {
							resultArray.push(data[key])
						}
						this.$store.state.allOriginTeams = resultArray
					})
			},
			validateForm: function() {
				let newUser = this.$store.state.newUser
				if(newUser.name == "" || newUser.email == "" || newUser.password == "" || newUser.teamName == "") {
					alert("Porfavor llena todos los campos")
				} else {
					this.step = !this.step
				}
			}
		},
		beforeMount: function() {
			this.getAllOriginTeams()
		},
		components: {
			'account-form': AccountForm,
			'pick-roster': PickRoster
		}
	}
</script>