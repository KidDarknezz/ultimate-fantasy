<template>
	<b-container>
		<b-row>
			<b-col cols="12">
				<h3 v-if="!step">Crear cuenta</h3>
				<h3 v-if="step">Selecciona tu roster</h3>
			</b-col>
		</b-row>
		<account-form v-if="!step"></account-form>
		<button class="btn btn-success" @click="step = !step" v-if="!step">Seleccionar roster</button>
		<pick-roster v-if="step"></pick-roster>
	</b-container>
</template>

<script>
	import AccountForm from '@/components/AccountForm.vue'
	import PickRoster from '@/components/PickRoster.vue'
	export default {
		data: function() {
			return {
				step: false
			}
		},
		methods: {

		},
		components: {
			'account-form': AccountForm,
			'pick-roster': PickRoster
		}
	}
</script>