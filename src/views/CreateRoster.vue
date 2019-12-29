<template>
	<div>
		<!-- HEADER -->
        <div class="row-fluid header" @click="logout()">
            <img
                src="@/assets/user-placeholder.jpg"
                class="img-fluid"
                style="float: left; margin-right: 15px;"
            />
            <h2 style="font-size: 25px; padding-top: 15px">Selecciona tu roster</h2>
        </div>
        <!-- END HEADER -->

        <!-- CREDITS -->
        <b-container>
        	<b-row>
        		<b-col cols="12">
        			<h2 style="text-align: center;">
        				Creditos disponibles:
        				<br>
        				<strong>150</strong>
        			</h2>
        		</b-col>
        	</b-row>
        </b-container>
        <!--  END CREDITS -->

        <!-- TEAMS LIST -->
        <b-container>
        	<b-row>
        		<b-col cols="12 dem-fantasy-rosterpick-team">
        			<div v-b-toggle="'collapse-1'" style="background-color: #FFBE0A; color: #333; padding: 6px 10px 3px 10px;">
        				<h4><strong>Team Name</strong></h4>
        			</div>
        			<b-collapse id="collapse-1" style="background-color: #fff; color: #333;">
        				<div style="padding: 10px;">
							<div class="form-check" style="padding-top: 10px; padding-bottom: 10px;" v-for="player in 20">
	    						<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
								<label class="form-check-label" for="defaultCheck1">
									<strong>Player Name</strong> - 150 Cdts
								</label>
							</div>
        				</div>
        			</b-collapse>
        		</b-col>
        	</b-row>
        </b-container>
        <!-- END TEAMS LIST -->

        <!-- SPACING -->
        <div style="height: 60px;"></div>
        <!-- END SPACING -->

        <!-- BOTTOM MENU -->
        <div class="dem-fantasy-bottom-menu">
            <router-link to="/" class="dem-fantasy-create-acc-cta">AYUDA</router-link>
            <router-link to="/" class="dem-fantasy-create-acc-cta">ATRAS</router-link>
        </div>
        <!-- END BOTTOM MENU -->

        <!-- <div class="container">
			<div class="row">
				<div class="col-xs-12">
					<input type="text" class="form-control" v-model="teamData.name">
				</div>
				<div class="col-xs-12">
					<div class="form-check">
						<div v-for="player in allPlayers">
							<input class="form-check-input" type="checkbox" :value="player.playerId" id="defaultCheck1">
							<label class="form-check-label" for="defaultCheck1">
	    						{{ player.name }}
							</label>
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
	
</template>

<script>
	export default {
		data: function() {
			return {
				allPlayers: [],
				teamData: {
					teamId: "",
					owner: "",
					name: "",
					roster: []
				}
			}
		},
		methods: {
			getPlayers: function() {
				this.$http.get('https://ultimate-fantasy-fe04f.firebaseio.com/players.json')
					.then(response => {
						return response.json()
					})
					.then(data => {
						const resultArray = []
						for (let key in data) {
							resultArray.push(data[key])
						}
						this.allPlayers = resultArray
					})
			}
		},
		beforeMount: function() {
			this.getPlayers()
		}
	}
</script>