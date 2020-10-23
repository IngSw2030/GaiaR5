<template>
  <q-page padding  style="background-color: #fdebc7">


    <q-item to="/centroBusqueda" active clickable v-ripple fixed-right >
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 8ex; " />
      </q-item-section>
    </q-item>

    <div class="text-weight-bold" style="color: #7FA949;">
      <div class="text-center"style="font-size: 3.5ex;" >{{centroElegido.nombre}} </div>
    </div>

    <div class="column relative-position container   flex flex-center" >
    <p style ="margin-bottom: 0px" >  Horario : {{centroElegido.horario}}</p>
      <p style ="margin-bottom: 0px" >  Dirección : {{centroElegido.direccion}}</p>

    </div>

    <q-list bordered padding>

      <q-item-label header  style ="margin-bottom: 0px" >
        <div class="text-dark">   Materiales : </div>
      </q-item-label>

      <q-item v-for="mat in centroElegido.materiales" >
        <q-item-section avatar>
          <q-icon color="primary" name="panorama_fish_eye" />
        </q-item-section>
        <q-item-section>{{mat.tag }} </q-item-section>

      </q-item>

    </q-list>


    <div class="relative-position container   flex flex-center" style="margin-top: 30px; ">
        <GmapMap
          :center="{lat:  centroElegido.lat , lng: centroElegido.lng}"
          :zoom="15"
          map-type-id="roadmap"
          style="width: 500px; height: 300px"
        >

          <GmapMarker :position="{lat:  centroElegido.lat , lng: centroElegido.lng}" />
        </GmapMap>
    </div>


    <q-item class="column justify-center full-height full-width text-center" >
      <div class="text-weight-bold" style="color: #7FA949;margin-top: 50px; ">
        <div class="text-center"style="font-size: 2.7ex;" >Conocer ruta desde mi ubicación </div>
      </div>

      <div >
      <q-btn to="/ruta"  color="light-green" label="Continuar" style="margin-top: 3px; "> </q-btn>
      </div>
    </q-item>


  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCvJo0DJMLi_DQFL_nw_XC0M2LFzU-YK40'
  }
})



@Component
export default class infoCentroAcopio extends Vue {
  data(){
    return{
      origen:{
        lat:undefined,
        lng:undefined
      }

    }
  }


   get coordenadasCA () {
     return this.$store.state.store_CA.coordenadas
   }


  get centroElegido () {
    return this.$store.state.store_CA.centroElegido
  }




}
</script>
