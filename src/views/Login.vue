<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-2">
				<h3>Login</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<label>Correo:</label>
				<input type="email" class="form-control" placeholder="test@test.com" v-model="user">
			</div>
			<div class="col-xs-12">
				<label>Contraseña:</label>
				<input type="password" class="form-control" placeholder="password" v-model="password">
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-xs-12">
				<button class="btn btn-success" @click="login">Login</button>
				<br>
				<router-link to="/create-account">Crear cuenta</router-link>
			</div>
		</div>
	</div>
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