<template>
  <q-page padding  style="background-color: #fdebc7">
    <q-input color="dark-12" v-model="text" label="Mi ubicación">
      <template v-slot:prepend>
        <q-icon name="person_pin_circle" style="color: #7FA949; size_font: 10 em" />
      </template>
    </q-input>
    <br>
    <q-input color="dark-12" v-model="text" label="Ubicación Centro de acopio" >
      <template v-slot:prepend>
        <q-icon name="person_pin_circle" style="color: #7FA949; size_font: 10 em" />
      </template>
    </q-input>
    <br>



    <div class="relative-position container   flex flex-center">
      <GmapMap
      :center="origen"
      :zoom="14"
      map-type-id="roadmap"
      style="width: 500px; height: 300px"
      >
        <GmapMarker :position="origen" />
        <GmapMarker :position="{lat:  destino.lat, lng: destino.lng}" />

        <gmap-polygon :paths="[origen,destino]" :editable="false" :draggable="false" :path="true" ></gmap-polygon>
      </GmapMap>
    </div>
    <br>


    <div class="relative-position container   flex flex-center">
    <q-btn style="color: #7FA949" align="center" icon="eco" label="Validar visita" @click="showNotif" >

    </q-btn>
    </div>


  </q-page>
</template>

<script lang="ts">

import {Vue, Component } from 'vue-property-decorator';
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyADfRbp9uevhD-MsNaoLKbvRWIKbZGPNWE'
  }
})
@Component
export default class Ruta extends Vue{
  semillas:String[] = [];
  data(){
    return{
      coordenadas:{
        lat:0,
        lng:0
      },

      origen:{
        lat:4.629070,
        lng: -74.062716
      },

      destino:{
        lat:4.632304,
        lng:-74.070685
      }

    }

  }

  showNotif () {
    this.$q.notify({
      type: 'positive',
      color:'light-green',
      message: `Visita Registrada`
    })
  }
}
</script>


<style scoped>

</style>
