<template>
  <q-page padding  style="background-color: #fdebc7">


    <q-item active clickable v-ripple fixed-right >
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 8ex; " />
      </q-item-section>
    </q-item>

    <div class="text-weight-bold" style="color: #7FA949;">
      <div class="text-center"style="font-size: 3.5ex;" >Centro de Acopio Villa Maria </div>
    </div>

    <div class="column relative-position container   flex flex-center" >
    <p style ="margin-bottom: 0px" >  Horario : L-S 8:00 am-3:30 pm</p>
      <p >  Recibe: plástico,cartón</p>
    </div>



    <div class="relative-position container   flex flex-center" style="margin-top: 30px; ">
        <GmapMap
          :center="{lat:4.629070, lng:-74.062716}"
          :zoom="15"
          map-type-id="roadmap"
          style="width: 500px; height: 300px"
        >

          <GmapMarker :position="{lat:  4.629070, lng: -74.062716}" />
        </GmapMap>
    </div>
    <q-item class="column justify-center full-height full-width text-center" >
      <div class="text-weight-bold" style="color: #7FA949;margin-top: 75px; ">
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
    key: 'AIzaSyADfRbp9uevhD-MsNaoLKbvRWIKbZGPNWE'
  }
})
@Component
export default class CercaDeMi extends Vue {}
</script>
