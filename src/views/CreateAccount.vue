<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<h3>Crear cuenta</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<label>Nombre:</label>
				<input type="text" class="form-control" placeholder="John Doe" v-model="newUser.name">
				<label>Email:</label>
				<input type="email" class="form-control" placeholder="john.doe@test.com" v-model="newUser.email">
				<label>Contraseña</label>
				<input type="password" class="form-control" placeholder="password" v-model="newUser.password">
				<br>
				<button class="btn btn-success" @click="postNewUser">Crear roster</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				newUser: {
					userId: '',
					name: '',
					email: '',
					password: ''
				}
			}
		},
		methods: {
			postNewUser: function() {
				this.$router.push('create-roster')
			}
		}
	}
</script>
