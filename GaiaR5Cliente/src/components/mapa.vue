<template>

  <q-page>

    <h2>  quiero saber mis coordenadas !!!!  </h2>

    <p>  {{coordenadas.lat}} latitud, {{coordenadas.lng}} longitud,  </p>

    <GmapMap
      :center="origen"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 500px; height: 300px"
    >

      <GmapMarker :position="origen" />
      <GmapMarker :position="{lat:  destino.lat, lng: destino.lng}" />

      <gmap-polygon :paths="[origen,destino]" :editable="false" :draggable="false" :path="true" ></gmap-polygon>

    </GmapMap>

  </q-page>
</template>


<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCvJo0DJMLi_DQFL_nw_XC0M2LFzU-YK40'
  }
})




 export default {
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

 },
   created(){
   }
}
</script>

<style >

</style>
