<template>
	<div>
		<!-- HEADER -->
        <div class="row-fluid header" @click="logout()">
            <img
                src="@/assets/user-placeholder.jpg"
                class="img-fluid"
                style="float: left; margin-right: 15px;"
            />
            <h2 style="font-size: 25px; padding-top: 15px">Tabla de posiciones</h2>
        </div>
        <!-- END HEADER -->

        <!-- MY RANKING INFO -->
        <b-container class="dem-fantasy-my-ranking-info">
        	<b-row>
        		<b-col>
        			<h2>Alejandro Millan</h2>
        			<h3>El equipo de Pepe</h3>
        			<h4>
        				<span style="margin-right: 25px;">4<sup>to</sup></span>
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
        <div class="dem-fantasy-bottom-menu">
            <router-link to="/" class="dem-fantasy-create-acc-cta">AYUDA</router-link>
            <router-link to="/" class="dem-fantasy-create-acc-cta">ATRAS</router-link>
        </div>
        <!-- END BOTTOM MENU -->
	</div>
</template>