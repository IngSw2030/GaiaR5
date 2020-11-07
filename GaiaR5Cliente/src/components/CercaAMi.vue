<template>
  <q-page style="background-color: #fdebc7 ">

    <div class="q-gutter-md row items-start">
      <q-input v-model="texto" color="verde" label="Buscar" label-color="light-green-9" style="width: 400px">
        <template v-slot:append>
          <q-btn color="light-green-9" flat icon="search" style="background-color: #fdebc7" @click="filtrarNombre">
          </q-btn>
        </template>
      </q-input>

      <q-select v-model="tags"
                :options="this.tagsMaterial"
                bg-color="#fdebc7"
                borderless
                color="light-green-9"
                label-color="light-green-9"
                multiple
                style="min-width: 50px; max-width: 200px; color: #7FA949 ">
        <template v-slot:append>
          <q-icon color="light-green-9" name="local_offer" @click="filtrarTag"/>
        </template>
      </q-select>
    </div>

    <div>
      <br>
      <p align="center" style="color: #7FA949; font-size: 18px">Centros de acopio</p>
    </div>

    <div class="relative-position container   flex flex-center" style="margin-top: 30px; ">
      <GmapMap
        :center="ubicacion"
        :zoom="13"
        map-type-id="roadmap"
        style="width: 750px; height: 450px"
      >

        <GmapMarker
          v-for="(centro, index) in centrosAcopioFiltrados"
          :key="`${centro.nombre}:${index}`"
          :clickable="true"
          :draggable="false"
          :position="{lat:  centro.lat , lng: centro.lng}"
          @click="seleccionarCentro(centro)"
        />

        <GmapMarker :icon="{url: require('../assets/person_pin_circle.svg'),
                    scaledSize: {width: 50, height: 60},
                    }"
                    :position="ubicacion"
        />


      </GmapMap>
    </div>

    <q-btn
      :icon="{ url: require('../assets/person_pin_circle.svg')}"
    />
  </q-page>
</template>


<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import * as VueGoogleMaps from 'vue2-google-maps';
import {Plugins} from '@capacitor/core';
import CentroAcopioBusqueda from "../api/clases/CentroAcopioBusqueda";

const {StringUtils} = require('turbocommons-ts');
const {Geolocation} = Plugins;


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCvJo0DJMLi_DQFL_nw_XC0M2LFzU-YK40'
  }
})

@Component
export default class cercaAmi extends Vue {

  texto = undefined
  tags = []
  centrosAcopioFiltrados = this.listaCentroCA
  centrofiltrado: CentroAcopioBusqueda[] = [];
  origen: any = {
    lat: undefined,
    lng: undefined
  };
  geoId: any = undefined;

  get ubicacion() {
    return this.$store.state.store_CA.ubicacionActual
  }

  get listaCentroCA() {
    return this.$store.state.store_CA.centrosCA
  }

  get tagsMaterial() {
    return this.$store.state.store_CA.tags
  }

  get listacentrobus() {
    return this.$store.state.store_CA.centrobus
  }

  data() {
    return {
      model: null,
      multiple: null
    }
  }

  buscar() {
  }

  getCurrentPosition() {
    Geolocation.getCurrentPosition().then(position => {
      this.origen.lat = position.coords.latitude
      this.origen.lng = position.coords.longitude
      this.setUbicacion(this.origen)
    });
  }

  created() {
    this.getCurrentPosition();
    this.geoId = Geolocation.watchPosition({}, (position, err) => {
      this.origen.lat = position.coords.latitude
      this.origen.lng = position.coords.longitude
      this.setUbicacion(this.origen)
    });
  }

  beforeDestroy() {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }

  setUbicacion(val:any) {
    this.$store.commit('store_CA/updateUbicacion', val)
  }

  setCentroElegido(val:any) {
    this.$store.commit('store_CA/updateCentroElegido', val)
  }

  seleccionarCentro(centro:any) {
    this.setCentroElegido(centro)
    this.$router.push('/ruta')
  }

  filtrarNombre() {
    this.centrosAcopioFiltrados = [];
    this.listaCentroCA.forEach((centro:any) => {
      if (StringUtils.compareSimilarityPercent(this.texto, centro.nombre) > 25) {
        this.centrosAcopioFiltrados.push(centro)
      }
    })
  }

  filtrarTag() {
    this.centrosAcopioFiltrados = [];
    this.tags.forEach((tag:any) => {
      this.listaCentroCA.forEach((centro:any) => {
        if (centro.tags.some((tagCentro:any) => {
          if (!this.centrosAcopioFiltrados.includes(centro) && tag == tagCentro) {
            this.centrosAcopioFiltrados.push(centro);
            return true;
          }
        })){};
      })
    })
  }

  prueba() {
    console.log(this.texto)

  }


}

</script>
<style scoped>

</style>
