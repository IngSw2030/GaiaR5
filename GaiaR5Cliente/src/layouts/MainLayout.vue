<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated style="background-color: #7FA949" v-if="usuario">
      <q-toolbar>
        <q-btn
          aria-label="Menu"
          dense
          flat
          icon="menu"
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          GaiaR5
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="400"
      :width="300"
      show-if-above
      v-if="usuario"
    >
      <q-scroll-area
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd; background-color: #fdebc7">
        <q-list padding>
          <q-item v-ripple clickable to="/home">
            <q-item-section avatar>
              <q-icon name="home" style="color: #7FA949;"/>
            </q-item-section>

            <q-item-section class="text-dark">
              Home
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;"/>
            </q-item-section>

          </q-item>

          <q-item v-ripple active clickable to="/semillas">
            <q-item-section avatar>
              <q-icon name="assessment" style="color: #7FA949;"/>
            </q-item-section>

            <q-item-section class="text-dark">
              Semillas
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;"/>
            </q-item-section>

          </q-item>

          <q-item v-ripple bg-grey-3 clickable>
            <q-item-section avatar>
              <q-icon name="account_box" style="color: #7FA949;"/>
            </q-item-section>

            <q-item-section class="text-dark">
              Eco usuarios
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;"/>
            </q-item-section>

          </q-item>

          <q-item v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="favorite" style="color: #7FA949;"/>
            </q-item-section>

            <q-item-section class="text-dark">
              Chat
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;"/>
            </q-item-section>

          </q-item>




          <q-item v-ripple active clickable to="/cerca">
            <q-item-section avatar>
              <q-icon name="location_on" style="color: #7FA949;"/>
            </q-item-section>

            <q-item-section class="text-dark">
              Centros de Acopio
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;"/>
            </q-item-section>

          </q-item>


          <q-item v-ripple active clickable to="/mapa">
            <q-item-section avatar>
              <q-icon name="settings" style="color: #7FA949;"/>
            </q-item-section>

            <q-item-section class="text-dark">
              Configuración
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;"/>
            </q-item-section>

          </q-item>

          <q-item v-ripple active clickable @click="cerrarSesion">
            <q-item-section avatar>
              <q-icon name="exit_to_app" style="color: #7FA949;"/>
            </q-item-section>

            <q-item-section class="text-dark">
              Cerrar Sesion
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;"/>
            </q-item-section>

          </q-item>


        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" style=" height: 150px; background-color: #fdebc7">
        <div class="absolute-bottom" style="background-color: #fdebc7">

          <div
            class="relative-position container   flex flex-center">
            <q-avatar class="fixed-center-right" size="56px" square>
              <img :src="usuario.avatar">
            </q-avatar>
          </div>

          <q-item-section>
            <div class="text-weight-bolder" style="color: #7FA949;">
              <div class="text-center">{{usuario.nombre}}</div>
            </div>
          </q-item-section>

          <div class="text-center" style="color: #336eb9;">{{usuario.email}}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {Usuario} from "../../../entidades/index";

@Component({
  components: {}
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  get usuario():Usuario{
    return this.$store.state.store_user.usuario;
  }
  public cerrarSesion(){
    this.$q.cookies.remove("usuario");
    this.$q.cookies.remove("token");
    this.$store.commit("store_user/actualizarUsuario", undefined);
    this.$router.push("/");
  }
}
</script>
