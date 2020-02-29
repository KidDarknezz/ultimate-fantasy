<template>
    <div>
        <!-- HEADER -->
        <Header></Header>
        <!-- END HEADER -->

        <!-- MY RANKING INFO -->
        <b-container class="dem-fantasy-my-ranking-info">
            <b-row>
                <b-col>
                    <h2>Alejandro Millan</h2>
                    <h3>El equipo de Pepe</h3>
                    <h4>
                        <span style="margin-right: 25px;">
                            4
                            <sup>to</sup>
                        </span>
                        <span>999 pts.</span>
                    </h4>
                </b-col>
            </b-row>
        </b-container>
        <!-- END MY RANKING INFO -->

        <!-- GLOBAL RANKING -->
        <b-container style="margin-top: 0; margin-bottom: 70px;">
            <b-row class="dem-fantasy-ranking-list-item">
                <b-col cols="2">
                    <p class="dem-fantasy-ranking-number dem-fantasy-ranking-first">1</p>
                </b-col>
                <b-col cols="10">
                    <p style="margin: 0; font-weight: 700;">Team Name - 999 pts.</p>
                    <p style="margin: 0">Player Name</p>
                </b-col>
            </b-row>
            <b-row class="dem-fantasy-ranking-list-item">
                <b-col cols="2">
                    <p class="dem-fantasy-ranking-number dem-fantasy-ranking-second">2</p>
                </b-col>
                <b-col cols="10">
                    <p style="margin: 0; font-weight: 700;">Team Name - 999 pts.</p>
                    <p style="margin: 0">Player Name</p>
                </b-col>
            </b-row>
            <b-row class="dem-fantasy-ranking-list-item">
                <b-col cols="2">
                    <p class="dem-fantasy-ranking-number dem-fantasy-ranking-third">3</p>
                </b-col>
                <b-col cols="10">
                    <p style="margin: 0; font-weight: 700;">Team Name - 999 pts.</p>
                    <p style="margin: 0">Player Name</p>
                </b-col>
            </b-row>
            <b-row class="dem-fantasy-ranking-list-item">
                <b-col cols="2">
                    <p class="dem-fantasy-ranking-number">4</p>
                </b-col>
                <b-col cols="10">
                    <p style="margin: 0; font-weight: 700;">Team Name - 999 pts.</p>
                    <p style="margin: 0">Player Name</p>
                </b-col>
            </b-row>
            <b-row class="dem-fantasy-ranking-list-item dem-fantasy-ranking-self">
                <b-col cols="2">
                    <p class="dem-fantasy-ranking-number">5</p>
                </b-col>
                <b-col cols="10">
                    <p style="margin: 0; font-weight: 700;">Team Name - 999 pts.</p>
                    <p style="margin: 0">Player Name</p>
                </b-col>
            </b-row>
        </b-container>
        <!-- END GLOBAL RANKING -->

        <!-- BOTTOM MENU -->
        <NavBar></NavBar>
        <!-- END BOTTOM MENU -->
    </div>
</template>

<script>
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
export default {
    components: {
        Header,
        NavBar,
    },
}
</script>