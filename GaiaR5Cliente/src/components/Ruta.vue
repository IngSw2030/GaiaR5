<template>
  <q-page padding  style="background-color: #fdebc7">
    <q-input color="dark-12" v-model="text" label="Mi ubicación">
      <template v-slot:prepend>
        <q-icon name="person_pin_circle" style="color: #7FA949; size_font: 10 em" />
      </template>
    </q-input>
    <br>
    <q-input color="dark-12" v-model="text" label="Ubicación Centro de acopio">
      <template v-slot:prepend>
        <q-icon name="person_pin_circle" style="color: #7FA949; size_font: 10 em" />
      </template>
    </q-input>
    <br>

    <div class="relative-position container   flex flex-center">
      <GmapMap
      :center="{lat:4.629070, lng:-74.062716}"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 500px; height: 300px"
      >
        <GmapMarker :position="{lat:  4.629070, lng: -74.062716}" />
      </GmapMap>
    </div>
    <br>
    <template >
    <q-btn style="color: #7FA949" align="center" icon="eco" label="Validar visita">
    </q-btn>
    </template>
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
export default class Ruta extends Vue{}
</script>


<style scoped>

</style>
