<template>
    <div>
        <!-- HEADER -->
        <div class="row-fluid header" @click="logout()">
            <img
                src="@/assets/user-placeholder.jpg"
                class="img-fluid"
                style="float: left; margin-right: 15px;"
            />
            <h2 style="font-size: 25px; padding-top: 15px">Selecciona el capitan</h2>
        </div>
        <!-- END HEADER -->

        <!-- ROSTER -->
        <div style="overflow-x: scroll; overflow-y: hidden; white-space: nowrap;">
            <img
                src="@/assets/user-placeholder.jpg"
                class="img-fluid"
                v-for="(el,i) in 7"
                :key="i"
                style="display: inline-block;"
            />
        </div>
        <!-- END ROSTER -->

        <!-- SEARCH -->
        <b-container>
            <b-row>
                <b-col cols="3">
                    <p style="font-size: 25px; font-weight: 700;">150</p>
                </b-col>
                <b-col cols="9">
                    <input type="text" class="form-control" placeholder="Buscar:" />
                </b-col>
            </b-row>
        </b-container>
        <!-- END SEARCH -->

        <!-- TEAMS -->
        <div v-b-toggle="'collapse-1'" style="background-color: #FFBE0A; padding: 10px;">
            <p style="margin: 0">TEAM NAME</p>
        </div>
        <b-collapse
            id="collapse-1"
            style="background-color: #fff; color: #333; margin-bottom: 25px;"
        >
            <div v-for="(el,i) in 7" :key="i">
                <img
                    src="@/assets/user-placeholder.jpg"
                    class="img-fluid"
                    style="display: inline-block;"
                />
                <p style="display: inline-block; margin-left: 10px;">
                    PLAYER NAME
                    <span style="margin-left: 25px;">Avanzado - 50</span>
                </p>
            </div>
        </b-collapse>
        <div v-b-toggle="'collapse-2'" style="background-color: #FFBE0A; padding: 10px;">
            <p style="margin: 0">TEAM NAME</p>
        </div>
        <b-collapse id="collapse-2" style="background-color: #fff; color: #333;">
            <div v-for="(el,i) in 7" :key="i">
                <img
                    src="@/assets/user-placeholder.jpg"
                    class="img-fluid"
                    style="display: inline-block;"
                />
                <p style="display: inline-block; margin-left: 10px;">
                    PLAYER NAME
                    <span style="margin-left: 25px;">Rookie - 50</span>
                </p>
            </div>
        </b-collapse>
        <!-- END TEAMS -->

        <!-- BOTTOM MENU -->
        <div class="dem-fantasy-bottom-menu">
            <router-link to="/" class="dem-fantasy-create-acc-cta">AYUDA</router-link>
            <router-link to="/" class="dem-fantasy-create-acc-cta">ATRAS</router-link>
        </div>
        <!-- END BOTTOM MENU -->
    </div>
</template>