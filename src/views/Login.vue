<template>
	<b-container>
		<b-row class="row" style="padding-top: 30px;">
			<b-col>
				<h3>DEM<i>tasy</i></h3>
			</b-col>
		</b-row>
		<b-row style="margin-top: 50px">
			<b-col cols="12">
				<label>Correo:</label>
				<input type="email" class="form-control" placeholder="test@test.com" v-model="user">
			</b-col>
			<b-col cols="12" style="margin-top: 20px;">
				<label>Contraseña:</label>
				<input type="password" class="form-control" placeholder="password" v-model="password">
			</b-col>
		</b-row>
		<br>
		<b-row>
			<b-col cols="12">
				<button class="btn btn-success" @click="login">Iniciar sesion</button>
				<br>
				<router-link to="/create-account">Crear cuenta</router-link>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	export default {
		data: function() {
			return {
				user: 'test1@gmail.com',
				password: 'test111',
				users: []
			}
		},
		methods: {
			getUsers: function() {
				this.$http.get('https://ultimate-fantasy-fe04f.firebaseio.com/users.json')
					.then(response => {
						return response.json()
					})
					.then(data => {
						const resultArray = []
						for (let key in data) {
							resultArray.push(data[key])
						}
						this.users = resultArray
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
				for(let i in this.users){
					if(this.user == this.users[i].email && this.password == this.users[i].password) {
						localStorage.userId = this.users[i].userId
						this.$router.push('home')
						break
					}
				}
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