<template>
	<b-row>
		<b-col cols="12">
			<label>Nombre:</label>
			<input type="text" class="form-control" placeholder="John Doe" v-model="$store.state.newUser.name">
			<label>Email:</label>
			<input type="email" class="form-control" placeholder="john.doe@test.com" v-model="$store.state.newUser.email">
			<label>Contraseña</label>
			<input type="password" class="form-control" placeholder="password" v-model="$store.state.newUser.password">
			<label>Nombra tu equipo fantasy</label>
			<input type="text" class="form-control" v-model="$store.state.newUser.teamName">
			<br>
		</b-col>
	</b-row>
</template>

<script>

</script>

<style>

</style>