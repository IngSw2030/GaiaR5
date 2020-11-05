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
        <q-icon color="light-green" name="eco" >
        </q-icon>
        <p >Materiales:</p>
      </q-item-section>
      <!-- <q-list>
        <q-item v-for="(mat, index) in centro.tags" :key="`${centro.nombre}:${index}`">
          <q-item-label >{{mat }} </q-item-label>
        </q-item>
      </q-list> -->
    </div>
    <div id="mapa">

    </div>
    <q-item class="column justify-center full-height full-width text-center" >
      <div class="text-weight-bold" style="color: #7FA949;margin-top: 50px; ">
        <div class="text-center" style="font-size: 2.7ex;" >Conocer ruta desde mi ubicación </div>
      </div>

      <div >
      <q-btn to="/ruta"  color="light-green" label="Continuar" style="margin-top: 3px; "> </q-btn>
      </div>
    </q-item>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {} from 'googlemaps';
import { Plugins } from '@capacitor/core'
import CentroAcopioBusqueda from "src/api/clases/CentroAcopioBusqueda";
import Map = google.maps.Map;
import Marker = google.maps.Marker;
const { Geolocation } = Plugins;
const url = "http://6684480d9141.ngrok.io";


@Component
export default class infoCentroAcopio extends Vue {
  @Prop() centro!: CentroAcopioBusqueda;
  origen = {
    latitud: 4.628305,
    longitud: -74.064502
  };
  mapa:Map | undefined = undefined;
  marcadorUsuario:Marker | undefined = undefined;
  marcadorCentro:Marker | undefined = undefined;

  mounted(){
    /*Geolocation.getCurrentPosition().then(position => {
      this.origen.latitud = position.coords.latitude;
      this.origen.longitud = position.coords.longitude;
    });*/
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

  volverABusqueda(){
    this.$emit("volver");
  }
}
</script>
<style>
 #mapa{
   height: 600px;
   width: 100%;
 }
</style>
