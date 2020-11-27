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

      <div id="mapa">

      </div>

    </div>
    <br>

    <div class="relative-position container   flex flex-center">
      <q-btn  style="color: #7FA949" v-on:click.once="showNotif" icon="eco" label="Validar visita" :disabled='validadorMapa' />
    </div>

  </q-page>
</template>


<script lang="ts">
import Vue from 'vue'
import { Plugins } from '@capacitor/core'
import {  } from 'vue-class-component'
const { Geolocation } = Plugins
import {} from 'googlemaps';
import {CentroAcopio} from "../../../entidades"
import Map = google.maps.Map;
import Marker = google.maps.Marker;

@Component
export default class Ruta extends Vue {

  centro = new CentroAcopio("las marianas","Cr 7 B No 12 17", "23", 4.629070,  -74.062716, "HTTP",25, 18, ["Vidrio", "Carton"] )

  origen = {
    latitud: 4.628305,
    longitud: -74.064502
  }
      destino={
        lat:undefined,
        lng:undefined
      }
      diflng=100
      diflat=100
      intervalid1=''


  getCurrentPosition() {
    Geolocation.getCurrentPosition().then(position => {
      this.origen.latitud=position.coords.latitude
      this.origen.longitud=position.coords.longitude
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

  mapa:Map | undefined = undefined;
  marcadorUsuario:Marker | undefined = undefined;
  marcadorCentro:Marker | undefined = undefined;

  mounted(){
    /*Geolocation.getCurrentPosition().then(position => {
      this.origen.latitud = position.coords.latitude;
      this.origen.longitud = position.coords.longitude;
    });*/
    console.log(this.centro)
    this.mapa = new google.maps.Map(<Element> document.getElementById("mapa"), {
      center: {lat: this.origen.latitud, lng: this.origen.longitud},
      zoom: 13
    });
    this.marcadorUsuario = new google.maps.Marker({
      position: {lat: this.origen.latitud, lng: this.origen.longitud},
      map: this.mapa,
      title: "Usted esta aqui",
      label: "Y"
    });
    this.marcadorCentro = new google.maps.Marker({
      position: {lat: this.centro.latitud, lng: this.centro.longitud},
      map: this.mapa,
      title: this.centro.nombre,
      label: this.centro.nombre[0]
    });
    let renderDirecciones =  new google.maps.DirectionsRenderer();
    let servicioDirecciones = new google.maps.DirectionsService();
    let peticion = {
      origin: {lat: this.origen.latitud, lng: this.origen.longitud},
      destination: {lat: this.centro.latitud, lng: this.centro.longitud},
      travelMode: google.maps.TravelMode.DRIVING
    }
    renderDirecciones.setMap(this.mapa);
    servicioDirecciones.route(peticion, ((result, status) => {
      if(status === "OK"){
        renderDirecciones.setDirections(result);
      }
    }));
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
