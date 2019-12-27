<template>
	<div>
		<!-- HEADER -->
        <div class="row-fluid header">
            <img src="@/assets/user-placeholder.jpg" class="img-fluid" style="float: left; margin-right: 15px;">
            <h2 style="font-size: 25px; padding-top: 15px">Alejandro Millan</h2>
        </div>
        <!-- END HEADER -->

        <!-- WELCOME MSG -->
        <b-container style="text-align: center;">
        	<b-row>
        		<b-col cols="12">
        			<h2>¡Bienvenido!</h2>
        			<br>
        		</b-col>
        		<b-col cols="12">
        			<p>Selecciona tu primer Fantasy de la lista para continuar</p>
        		</b-col>
        	</b-row>
        </b-container>
        <!-- END WELCOME MSG -->
        <br>
        <!-- FANTASY LIST -->
        <b-container class="dem-fantasy-tile" style="background-image: url('https://via.placeholder.com/1920x600'); padding-top: 20px;">
            <b-row>
                <b-col cols="2">
                    <img src="@/assets/cds.png" style="padding-top: 10px;" class="img-fluid">
                </b-col>
                <b-col cols="10">
                    <h4>
                        Liga de Verano
                        <br>
                        Ciudad del Saber 2020
                    </h4>
                </b-col>
                <b-col cols="12">
                	<button class="dem-fantasy-cta">
                        Participar
                    </button>
                </b-col>
            </b-row>
        </b-container>
        <!-- END FANTASY LIST -->
	</div>
</template>