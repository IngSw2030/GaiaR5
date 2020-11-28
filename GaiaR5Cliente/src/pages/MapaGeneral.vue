<template>
  <div>
    <q-card style="background-color: #fbf5d8">
      <q-card-section>
        <q-select v-model="busquedaTags" :options="tags" multiple label="Recursos"/>
        <br>
        <q-btn label="Buscar" @click="busqueda" class="full-width"/>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Resultados</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-for="centro in resultado" :key="centro.nombre">
            <centro-acopio-busqueda :centro="centro"></centro-acopio-busqueda>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <div id="mapa">
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {} from 'googlemaps';
import CentroAcopioBusqueda from "components/CentroAcopioBusqueda.vue";
import Map = google.maps.Map;
import Marker = google.maps.Marker;
import Controlador from "../api/Controlador";
import {CentroAcopio} from "../../../entidades/index";
@Component({
  components: {
    CentroAcopioBusqueda
  }
})
export default class MapaGeneral extends Vue {
  busquedaCentro: string = "";
  busquedaTags: string[] = [];
  tags: string[] = [];
  resultado: CentroAcopio[] = [];
  origen = {
    latitud: 4.628305,
    longitud: -74.064502
  };
  mapa:Map | undefined = undefined;
  marcadores: Marker[] = [];

  async mounted(){
    this.mapa = new google.maps.Map(<Element> document.getElementById("mapa"), {
      center: {lat: this.origen.latitud, lng: this.origen.longitud},
      zoom: 13
    });
    this.marcadores.push(
      new google.maps.Marker({
        position: {lat: this.origen.latitud, lng: this.origen.longitud},
        map: this.mapa,
        title: "Usted esta aqui",
        label: "Y"
      })
    );
    let consulta = await Controlador.get("recursos");
    this.tags = consulta.data;
  }

  limpiarMapa(){
    for(let marcador of this.marcadores){
      marcador.setMap(null);
    }
    this.marcadores = [];
    this.marcadores.push(
      new google.maps.Marker({
        position: {lat: this.origen.latitud, lng: this.origen.longitud},
        map: this.mapa,
        title: "Usted esta aqui",
        label: "Y"
      })
    );
  }

  presentarEnElMapa(){
    for(let centro of this.resultado){
      let marcador = new google.maps.Marker({
        position: {lat: centro.latitud, lng: centro.longitud},
        map: this.mapa,
        title: centro.nombre,
        label: centro.nombre[0]
      });
      marcador.addListener("click", () => {
        let renderDirecciones =  new google.maps.DirectionsRenderer();
        let servicioDirecciones = new google.maps.DirectionsService();
        let peticion = {
          origin: {lat: this.origen.latitud, lng: this.origen.longitud},
          destination: {lat: centro.latitud, lng: centro.longitud},
          travelMode: google.maps.TravelMode.DRIVING
        }
        renderDirecciones.setMap(this.mapa);
        servicioDirecciones.route(peticion, ((result, status) => {
          if(status === "OK"){
            renderDirecciones.setDirections(result);
          }
        }));
      });
      this.marcadores.push(
        marcador
      );
    }
  }

  async busqueda(){
    let consulta = await Controlador.get("centroAcopio/recurso", {
      params:{
        recurso: this.tags
      }
    });
    this.resultado = consulta.data;
    this.limpiarMapa();
    this.presentarEnElMapa();
  }
}
</script>
<style>
 #mapa{
   height: 600px;
   width: 100%;
 }
</style>
