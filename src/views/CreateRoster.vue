<template>
    <div>
        <!-- HEADER -->
        <Header></Header>
        <!-- END HEADER -->
        <b-row>
            <b-col cols="12">
                <p style="font-size: 25px; font-weight: 700;">{{titulo}}</p>
            </b-col>
        </b-row>
        <!-- ROSTER -->
        <div style="overflow-x: scroll; overflow-y: hidden; white-space: nowrap;">
            <img
                src="@/assets/user-placeholder.jpg"
                class="img-fluid"
                v-for="(el,i) in roster"
                :key="i"
                style="display: inline-block;"
            />
        </div>
        <!-- END ROSTER -->

        <!-- SEARCH -->
        <b-container>
            <b-row>
                <b-col cols="3">
                    <p style="font-size: 25px; font-weight: 700;">{{credit}}</p>
                </b-col>
                <b-col cols="9">
                    <input
                        type="text"
                        class="form-control"
                        v-model="filterName"
                        placeholder="Buscar:"
                    />
                </b-col>
            </b-row>
        </b-container>
        <!-- END SEARCH -->
        <!-- TEAMS -->
        <div v-for="(team, index) in filteredList" :key="index">
            <div v-b-toggle="`collapse-${index}`" style="background-color: #FFBE0A; padding: 10px;">
                <p style="margin: 0">{{team.name}}</p>
            </div>
            <b-collapse
                :id="`collapse-${index}`"
                style="background-color: #fff; color: #333; margin-bottom: 25px;"
            >
                <div
                    v-for="(player,i) in  team.Jugadores"
                    :key="i"
                    @click="pickPlayer(team, player)"
                >
                    <img
                        src="@/assets/user-placeholder.jpg"
                        class="img-fluid"
                        style="display: inline-block;"
                    />
                    <p style="display: inline-block; margin-left: 10px;">
                        {{player.nombre}}
                        <span style="margin-left: 25px;">Cost: 10</span>
                    </p>
                </div>
            </b-collapse>
        </div>

        <!-- END TEAMS -->

        <!-- BOTTOM MENU -->
        <NavBar></NavBar>
        <!-- END BOTTOM MENU -->
    </div>
</template>
<script>
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import * as api from '@/api/api'
export default {
    data() {
        return {
            Loading: false,
            teamName: '',
            leagueName: '',
            leagueId: '',
            leagueTeams: [],
            playersNames: [],
            filterName: '',
            roster: [],
            credit: 100,
            titulo: 'Esoge tu capitan',
        }
    },
    components: {
        Header,
        NavBar,
    },
    computed: {
        admin() {
            return this.$store.getters.isAdmin
        },
        user() {
            return this.$store.getters.user
        },
        uid() {
            return this.$store.getters.uid
        },
        filteredList() {
            const filteredData = this.leagueTeams
                .map(team => {
                    const teamName = team.name
                    const players = team['Jugadores'].filter(player =>
                        player['nombre']
                            .toLowerCase()
                            .includes(this.filterName.toLowerCase())
                    )
                    return players.length
                        ? {name: teamName, Jugadores: players}
                        : null
                })
                .filter(Boolean)
            return filteredData
        },
    },
    methods: {
        confirmAlert(team, player, n) {
            let array = [
                'Capitan',
                'Segundo',
                'Tercero',
                'Cuarto',
                'Quinto',
                'Sexto',
                'Septimo',
                'Octavo',
                'Noveno',
                'Decimo',
            ]
            let palabra = array[n]
            let titulo = array[n + 1]
            if (
                confirm(
                    `Estas escojiendo a ${player.nombre} como tu ${palabra} estas seguro?`
                )
            ) {
                this.roster.push(player)
                this.titulo =
                    n === 9 ? 'Listo' : `Escoje a tu ${titulo} Jugador`
                this.credit -= 10
            }
            this.splicePlayer(team, player)
            if (n === 9) {
                if (
                    confirm(
                        'Deseas guardar este equipo como tu roster? \n Si precionas CANCELAR se borrara todo'
                    )
                ) {
                    this.saveRoster()
                }
                this.clearEverything()
            }
        },
        splicePlayer(t, p) {
            this.leagueTeams.forEach(team => {
                if (team.name === t.name) {
                    team.Jugadores.splice(team.Jugadores.indexOf(p), 1)
                }
            })
        },
        saveRoster() {
            api.saverostertouid({
                uid: this.uid,
                leagueId: this.leagueId,
                roster: this.roster,
            })
                .then(response => {
                    this.$router.push({path: `/ranking/${this.leagueId}`})
                })
                .catch(err => {
                    console.log(err)
                })
        },
        clearEverything() {
            this.roster = []
            this.credit = 100
            this.titulo = 'Esoge tu capitan'
            api.returnteamsinleague({leagueId: this.leagueId}).then(
                response => {
                    this.leagueTeams = response.data.status
                }
            )
        },

        switchcase(cases, defaultCase, key) {
            if (cases.hasOwnProperty(key)) {
                return cases[key]
            } else {
                return defaultCase
            }
        },
        pickPlayer(team, player) {
            switch (this.roster.length) {
                case 0:
                    this.confirmAlert(team, player, 0)
                    break
                case 1:
                    this.confirmAlert(team, player, 1)
                    break
                case 2:
                    this.confirmAlert(team, player, 2)
                    break
                case 3:
                    this.confirmAlert(team, player, 3)
                    break
                case 4:
                    this.confirmAlert(team, player, 4)
                    break
                case 5:
                    this.confirmAlert(team, player, 5)
                    break
                case 6:
                    this.confirmAlert(team, player, 6)
                    break
                case 7:
                    this.confirmAlert(team, player, 7)
                    break
                case 8:
                    this.confirmAlert(team, player, 8)
                    break
                case 9:
                    this.confirmAlert(team, player, 9)
                    break
            }
        },
    },
    async beforeMount() {
        this.Loading = true
        this.leagueId = this.$route.params.leagueId
        api.returnleaguebyid({leagueId: this.leagueId}).then(response => {
            let league = response.data.status
            this.teamName = Object.keys(
                league.teamNames.filter(
                    v => Object.values(v).toString() === this.uid
                )[0]
            )
            api.returnteamsinleague({leagueId: this.leagueId}).then(
                response => {
                    this.leagueTeams = response.data.status
                }
            )
        })
        this.Loading = false
    },
}
</script>