<template>
	<b-container>
		<b-row class="row" style="padding-top: 70px;">
			<b-col>
				<h3>DEM<i>tasy</i></h3>
			</b-col>
		</b-row>
		<b-row style="margin-top: 50px">
			<b-col cols="12">
				<label>Correo:</label>
				<input type="email" class="form-control" placeholder="test@test.com" v-model="user" v-on:keyup.enter="login">
			</b-col>
			<b-col cols="12" style="margin-top: 20px;">
				<label>Contraseña:</label>
				<input type="password" class="form-control" placeholder="password" v-model="password" v-on:keyup.enter="login">
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col cols="12">
				<button class="btn btn-success" @click="login">Iniciar sesion</button>
				<br><br>
				<router-link to="/create-account">Crear cuenta</router-link>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	export default {
		data: function() {
			return {
				user: '',
				password: ''
			}
		},
		methods: {
			getUsers: function() {
				this.$http.get('https://ultimate-fantasy-fe04f.firebaseio.com/users.json')
					.then(response => {
						const data = response.data
						const users = []
						for (let i in data) {
							const user = data[i]
							user.id = i
							users.push(user)
						}
						this.$store.state.allUsers = users
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
						this.$store.state.allPlayers = resultArray
					})
			},
			login: function() {
				for(let i in this.$store.state.allUsers){
					if(this.user == this.$store.state.allUsers[i].email && this.password == this.$store.state.allUsers[i].password) {
						localStorage.userId = this.$store.state.allUsers[i].id
						this.$router.push('home')
						return
					}
				}
				alert("Usuario incorrecto")
			}
		},
		beforeMount: function() {
			this.getUsers()
			this.getPlayers()
		}
	}
</script>

<style>
	h3 {
		text-align: center;
	}
	.container {
		margin-top: 30px;
	}
</style>