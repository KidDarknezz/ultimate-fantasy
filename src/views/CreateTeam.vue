<template>
	<div>
		<!-- HEADER -->
        <div class="row-fluid header" @click="logout()">
            <img
                src="@/assets/user-placeholder.jpg"
                class="img-fluid"
                style="float: left; margin-right: 15px;"
            />
            <h2 style="font-size: 25px; padding-top: 15px">Crea tu equipo</h2>
        </div>
        <!-- END HEADER -->

        <!-- CREATE TEAM NAME -->
        <b-container>
        	<b-row>
        		<b-col cols="12">
        			<label>Ponle nombre a tu equipo fantasy:</label>
        			<input type="text" class="form-control">
        		</b-col>
        	</b-row>
        </b-container>
        <!-- END CREATE TEAM NAME -->

        <!-- INSTRUCTIONS -->
        <b-container>
        	<b-row>
        		<b-col cols="12">
        			<h3 style="text-align: left;">Instrucciones</h3>
        			<br>
        			<ol>
        				<li>Ponle un nombre a tu equipo</li>
        				<li>Selecciona los jugadores para tu roster</li>
        				<li>bla bla bla....</li>
        				<li>bla bla bla....</li>
        				<li>bla bla bla....</li>
        				<li>bla bla bla....</li>
        				<li>bla bla bla....</li>
        				<li>bla bla bla....</li>
        			</ol>
        		</b-col>
        	</b-row>
        </b-container>
        <!-- END INSTRUCTIONS -->

        <!-- BOTTOM MENU -->
        <div class="dem-fantasy-bottom-menu">
            <router-link to="/" class="dem-fantasy-create-acc-cta">AYUDA</router-link>
            <router-link to="/" class="dem-fantasy-create-acc-cta">ATRAS</router-link>
        </div>
        <!-- END BOTTOM MENU -->

	</div>	
</template>