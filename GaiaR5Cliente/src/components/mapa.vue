<template>

  <q-page>

    <h2>  quiero saber mis coordenadas   </h2>

    <p>   var, {{cosa}}   </p>

    <p>  {{ubicacion.lat}} latitud, {{ubicacion.lng}} longitud,  </p>
    <p>  {{coordenadas.lat}} latitud, {{coordenadas.lng}} longitud,  </p>


    <GmapMap
      ref="map"
      :center="ubicacion"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 500px; height: 300px"
    >

      <GmapMarker :position="this.origenC" />
      <GmapMarker :position="{lat:  this.destinoC.lat, lng: this.destinoC.lng}" />

      <GmapInfoWindow :position="this.origenC" :options="{pixelOffset: {width: 0, height: -35} }">
        <p>   var, {{variable}}   </p>
        </GmapInfoWindow>

      <gmap-polygon :paths="[this.origenC,this.destinoC]" :editable="false" :draggable="false"  ></gmap-polygon>

    </GmapMap>


    <div >
      <q-btn @click="dibujarRuta" color="light-green" label="Continuar" style="margin-top: 3px; "> </q-btn>
    </div>

  </q-page>
</template>


<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { Plugins } from '@capacitor/core'
import Component from 'vue-class-component'
const { Geolocation } = Plugins


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCvJo0DJMLi_DQFL_nw_XC0M2LFzU-YK40'
  }
})


@Component
export default class mapa extends Vue {

  cosa= this.prueba()

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
  }
  getCurrentPosition() {
    Geolocation.getCurrentPosition().then(position => {
      //this.origen.lat=position.coords.latitude
      //this.origen.lng=position.coords.longitude
      //this.$store.commit('store_CA/updateUbicacion', origen)
    });
  }

  mounted () {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({}, (position, err) => {
      //this.origen.lat=position.coords.latitude
      //this.origen.lng=position.coords.longitude
      //this.$store.commit('store_CA/updateUbicacion', origen)
    })
  }

  beforeDestroy () {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }

  cambiarVariable(val){
    this.$store.commit('store_CA/updateUbicacion', val)
    console.log(this.ubicacion)
  }


  get coordenadas(){
    return this.$store.state.store_CA.coordenadas
  }

  get ubicacion(){
    return this.$store.state.store_CA.ubicacionActual
  }

  set setUbicacion (val) {
    this.$store.commit('store_CA/updateUbicacion', val)
  }

  get variable(){
    return this.$store.state.store_CA.variable
  }

  set setVariable (val) {
    this.$store.commit('store_CA/updateVariable', val)
  }


  prueba(){
    var co=5
    return co
  }

  dibujarRuta() {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.$refs.map.$mapObject);



    //google maps API's direction service

    function dibujarMapa(ds,dd){
      ds.route({
          origin: this.origenC,
          destination: this.destinoC,
          travelMode: 'TRANSIT'
        },
        function (response, status) {
        if (status === "OK") {
          dd.setDirections(response);
        } else {
          console.log("no salio")
          window.alert("Directions request failed due to " + status);
        }
          });
    }


  }


}
</script>


<style >

</style>
