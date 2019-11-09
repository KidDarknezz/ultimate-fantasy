<template>
    <b-row>
        <b-col cols="12">
            <label>Nombre:</label>
            <input type="text" class="form-control" placeholder="John Doe" v-model="name" />
            <label>Email:</label>
            <input
                type="email"
                class="form-control"
                placeholder="john.doe@test.com"
                v-model="email"
            />
            <label>Contraseña</label>
            <input type="password" class="form-control" placeholder="password" v-model="password" />
            <label>Nombra tu equipo fantasy</label>
            <input type="text" class="form-control" v-model="teamName" />
            <br />
            <button @click="validateForm" class="btn btn-success">Seleccionar roster</button>
        </b-col>
    </b-row>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            teamName: '',
        }
    },
    methods: {
        validateForm() {
            if (
                this.name == '' ||
                this.email == '' ||
                this.password == '' ||
                this.teamName == ''
            ) {
                alert('Porfavor llena todos los campos')
            }
            this.$emit('formSuccess', {
                name: this.name,
                email: this.email,
                password: this.password,
                teamName: this.teamName,
            })
        },
    },
}
</script>

<style>
</style>