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
        :center="ubicacion"
        :zoom="15"
        map-type-id="roadmap"
        style="width: 500px; height: 300px"
      >

        <GmapMarker :position="ubicacion" />
        <GmapMarker :position="coordenadasCA" />

        <gmap-polygon :paths="[ubicacion,coordenadasCA]" :editable="false" :draggable="false"  ></gmap-polygon>

      </GmapMap>

    </div>
    <br>


    <div class="relative-position container   flex flex-center">
    <q-btn style="color: #7FA949" align="center" icon="eco" label="Validar visita" @click="showNotif" >

    </q-btn>
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
export default class Ruta extends Vue {
  data(){
    return{
      origen:{
        lat: undefined,
        lng: undefined
      },
      destino:{
        lat:undefined,
        lng:undefined
      }
    }
  }

  getCurrentPosition() {
    Geolocation.getCurrentPosition().then(position => {
      this.origen.lat=position.coords.latitude
      this.origen.lng=position.coords.longitude
      setUbicacion(origen)
    });
  }

  created () {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({}, (position, err) => {
      this.origen.lat=position.coords.latitude
      this.origen.lng=position.coords.longitude
      setUbicacion(origen)
    })
  }

  beforeDestroy () {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }

  get coordenadasCA(){
    return this.$store.state.store_CA.coordenadas
  }

  get ubicacion(){
    return this.$store.state.store_CA.ubicacionActual
  }

  get semillas(){
    return this.$store.state.store_CA.acumSemillas
  }

  setUbicacion(val){
    this.$store.commit('store_CA/updateUbicacion', val)
  }

  sumarSemillas(val){
    this.$store.commit('store_CA/updateSemillas', val)
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
