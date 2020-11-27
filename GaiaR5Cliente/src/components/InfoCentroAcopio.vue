<template>
  <div>
    <q-item @click="volverABusqueda" active clickable v-ripple fixed-right >
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 5ex; " />
      </q-item-section>
    </q-item>

    <div class="text-weight-bold" style="color: #7FA949;">
      <div class="text-center" style="font-size: 3.5ex;" >{{centro.nombre}} </div>
    </div>

    <div class="column relative-position container   flex flex-center" >
    <p style ="margin-bottom: 0px" >  Horario : {{centro.horario}}</p>
      <p style ="margin-bottom: 0px" >  Dirección : {{centro.direccion}}</p>
      <q-item-section avatar style="display: flex;flex-direction: row;justify-content: center;align-content: center" >
        <q-icon color="light-green" name="eco"/>
        <p >Materiales:</p>
      </q-item-section>

    </div>
    <div id="mapa">

    </div>
    <div class="relative-position container   flex flex-center">
      <q-btn  style="color: #7FA949" v-on:click.once="showNotif" icon="eco" label="Validar visita" :disabled='validadorMapa' />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {} from 'googlemaps';
import {CentroAcopio} from "../../../entidades"
import { Plugins } from '@capacitor/core'

import Map = google.maps.Map;
import Marker = google.maps.Marker;
const { Geolocation } = Plugins;
const url = "http://66e295d86ba6.ngrok.io/";


@Component
export default class infoCentroAcopio extends Vue {
  //@Prop() centro!: CentroAcopio;
  origen = {
    latitud: 4.628305,
    longitud: -74.064502
  };

centro = new CentroAcopio("las marianas","Cr 7 B No 12 17", "23", 4.629070,  -74.062716, "HTTP",25, 18, ["Vidrio", "Carton"] )


  mapa:Map | undefined = undefined;
  marcadorUsuario:Marker | undefined = undefined;
  marcadorCentro:Marker | undefined = undefined;


  getCurrentPosition() {
    Geolocation.getCurrentPosition().then(position => {
      this.origen.latitud=position.coords.latitude
      this.origen.longitud=position.coords.longitude
    });
  }

  created () {
    this.getCurrentPosition()

    // we start listening
    this.geoId = Geolocation.watchPosition({}, (position, err) => {
      this.origen.latitud=position.coords.latitude
      this.origen.longitud=position.coords.longitude
    })
  }

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


  beforeDestroy() {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }

  volverABusqueda(){
    this.$emit("volver");
  }

  showNotif () {
    this.$q.notify({
      type: 'positive',
      color:'light-green',
      message: `Visita Registrada`,
    })
    //this.sumarSemillas(500)
  }


}
</script>
<style>
 #mapa{
   height: 600px;
   width: 100%;
 }
</style>
