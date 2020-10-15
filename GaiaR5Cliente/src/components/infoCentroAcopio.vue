<template>
  <q-page padding  style="background-color: #fdebc7">

    <q-item active clickable v-ripple fixed-right >
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 8ex; " />
      </q-item-section>
    </q-item>

    <div class="text-weight-bold" style="color: #7FA949;">
      <div class="text-center"style="font-size: 3.5ex;" >Centro de Acopio Cercanos a ti </div>
    </div>

    <q-input color="dark-12" v-model="text" label="Mi ubicación">
      <template v-slot:prepend>
        <q-icon name="person_pin_circle" style="color: #7FA949; size_font: 10 em" />
      </template>
    </q-input>

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


  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB5GlEzO74zRRZaPcWeWG4nNdPDUeTdXro'
  }
})
@Component
export default class CercaDeMi extends Vue {}
</script>
