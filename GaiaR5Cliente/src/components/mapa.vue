<template>

  <q-page>

    <h2>  quiero saber mis coordenadas !!!!  </h2>

    <p>  {{origen.lat}} latitud, {{origen.lng}} longitud,  </p>
    <p>  {{coordenadas.lat}} latitud, {{coordenadas.lng}} longitud,  </p>


    <GmapMap
      :center="origen"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 500px; height: 300px"
    >

      <GmapMarker :position="origen" />
      <GmapMarker :position="{lat:  coordenadas.lat, lng: coordenadas.lng}" />

      <gmap-polygon :paths="[origen,coordenadas]" :editable="false" :draggable="false"  ></gmap-polygon>

    </GmapMap>

  </q-page>
</template>


<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { Plugins } from '@capacitor/core'
import { mapsGetters } from 'vuex'
const { Geolocation } = Plugins


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCvJo0DJMLi_DQFL_nw_XC0M2LFzU-YK40'
  }
})



 export default {
 data(){
      return{
        origen:{
          lat: undefined,
          lng: undefined
        },
        origenC:{
          lat:4.629070,
          lng: -74.062716
        },

        destino:{
          lat:undefined,
          lng:undefined
        },
        destinoC:{
          lat:4.632304,
          lng:-74.070685
        }
      }
 },

   methods: {
     getCurrentPosition() {
       Geolocation.getCurrentPosition().then(position => {
         this.origen.lat=position.coords.latitude
         this.origen.lng=position.coords.longitude
       });
     }
   },

   mounted () {
     this.getCurrentPosition()

     // we start listening
     this.geoId = Geolocation.watchPosition({}, (position, err) => {
       this.origen.lat=position.coords.latitude
       this.origen.lng=position.coords.longitude
     })
   },
   beforeDestroy () {
     // we do cleanup
     Geolocation.clearWatch(this.geoId)
   },

   computed: {
     coordenadas: {
       get () {
         return this.$store.state.store_CA.coordenadas
       }
   }

   }
}
</script>


<style >

</style>
