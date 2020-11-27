<template>

  <q-page>
    <div id="mapa">

    </div>

  </q-page>
</template>


<script>
import {Component, Vue} from 'vue-property-decorator';
import {} from 'googlemaps';
import {CentroAcopio} from "../../../entidades"
import {Plugins} from '@capacitor/core'

const {Geolocation} = Plugins


@Component
export default class mapa extends Vue {

  cosa = this.prueba()

  origen= {
    lat: undefined,
    lng: undefined
  }
  origenC= {
    lat: 4.629070,
    lng: -74.062716
  }

  destino= {
    lat: undefined,
    lng: undefined
  }
  destinoC= {
    lat: 4.632304,
    lng: -74.070685
  }

  get coordenadas() {
    return this.$store.state.store_CA.coordenadas
  }

  get ubicacion() {
    return this.$store.state.store_CA.ubicacionActual
  }

  set setUbicacion(val) {
    this.$store.commit('store_CA/updateUbicacion', val)
  }

  get variable() {
    return this.$store.state.store_CA.variable
  }

  set setVariable(val) {
    this.$store.commit('store_CA/updateVariable', val)
  }

/*
  getCurrentPosition() {
    Geolocation.getCurrentPosition().then(position => {
      //this.origen.lat=position.coords.latitude
      //this.origen.lng=position.coords.longitude
      //this.$store.commit('store_CA/updateUbicacion', origen)
    });
  }

  mounted() {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({}, (position, err) => {
      //this.origen.lat=position.coords.latitude
      //this.origen.lng=position.coords.longitude
      //this.$store.commit('store_CA/updateUbicacion', origen)
    })
  }

  beforeDestroy() {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }

  cambiarVariable(val) {
    this.$store.commit('store_CA/updateUbicacion', val)
    console.log(this.ubicacion)
  }

  prueba() {
    var co = 5
    return co
  }
*/


}
</script>


<style>

</style>
