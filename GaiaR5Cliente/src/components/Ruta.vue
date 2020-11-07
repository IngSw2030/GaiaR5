<template>
  <q-page padding  style="background-color: #fdebc7">

    <q-item to="/cerca" active clickable v-ripple fixed-right >
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 5ex" />
      </q-item-section>
    </q-item>

    <div class="text-weight-bold" style="color: #7FA949;">
      <div class="text-center"style="font-size: 3.5ex;" >{{centroElegido.nombre}} </div>
    </div>

    <div class="column relative-position container   flex flex-center" >
      <p style ="margin-bottom: 0px" >  Horario : {{centroElegido.horario}}</p>
      <p style ="margin-bottom: 0px" >  Dirección : {{centroElegido.direccion}}</p>

      <br>

      <q-item >
        <q-item-section avatar style="display: flex;flex-direction: row;justify-content: center;align-content: center">
          <q-icon color="primary" name="person_pin_circle" style="font-size: 1.5rem" />
          <p class="text-dark" style="vertical-align: center">   Mi ubicación : </p>
        </q-item-section>


      </q-item>


    </div>


    <div class="relative-position container   flex flex-center">
      <GmapMap
        :center="ubicacion"
        :zoom="15"
        :options="mapOptions"
        map-type-id="roadmap"
        style="width: 500px; height: 300px"
      >

        <GmapMarker :position="ubicacion"/>
        <GmapMarker :position="{lat:  centroElegido.lat, lng: centroElegido.lng}" />

        <gmap-polygon :paths="[ubicacion,{lat:  centroElegido.lat, lng: centroElegido.lng}]" :editable="false" :draggable="false"  ></gmap-polygon>

        <GmapInfoWindow :position="{lat:  centroElegido.lat, lng: centroElegido.lng}" :options="{pixelOffset: {width: 0, height: -35},
        content:'Destino' }" />

      </GmapMap>

    </div>
    <br>

    <div class="relative-position container   flex flex-center">
      <q-btn  style="color: #7FA949" v-on:click.once="showNotif" icon="eco" label="Validar visita" :disabled='validadorMapa' />
    </div>

  </q-page>
</template>


<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { Plugins } from '@capacitor/core'
import {  } from 'vue-class-component'
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
      },
      mapOptions:{
        fullscreenControl:false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        disableDefaultUi: false,
      },
      diflng:100,
      diflat:100,
      intervalid1:'',

    }
  }

  getCurrentPosition() {
    Geolocation.getCurrentPosition().then(position => {
      this.origen.lat=position.coords.latitude
      this.origen.lng=position.coords.longitude
      this.setUbicacion(this.origen)

    });
  }

  created () {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({}, (position, err) => {
      this.origen.lat=position.coords.latitude
      this.origen.lng=position.coords.longitude
      this.setUbicacion(this.origen)
      this.todo()
    })
  }

  beforeDestroy () {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }

  get coordenadasCA(){
    return this.$store.state.store_CA.coordenadas
  }

  verficarCercania(){
    this.setCoordendas()
    if(0.0003>=this.diflat)
    {
     if (0.0003>=this.diflng){
       this.setValidadorMapa(false)
    }
    }
  }

  setValidadorMapa(val){
    this.$store.commit('store_CA/updateValidadorMapa', val)
  }


  setCoordendas(){
    this.diflng=Math.abs(this.ubicacion.lat-this.centroElegido.lat)
    this.diflat=Math.abs(this.ubicacion.lng-this.centroElegido.lng)
  }

  get ubicacion(){
    return this.$store.state.store_CA.ubicacionActual
  }

  get semillas(){
    return this.$store.state.store_CA.acumSemillas
  }

  get validadorMapa(){
    return this.$store.state.store_CA.validadorMapa
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
      message: `Visita Registrada`,
    })
    this.sumarSemillas(500)
  }

  get centroElegido () {
    return this.$store.state.store_CA.centroElegido
  }

  todo(){
    this.intervalid1 = setInterval(() => {
     this.verficarCercania();
    }, 2000);
  }


}
</script>

<style scoped>



</style>
