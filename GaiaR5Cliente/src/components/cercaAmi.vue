<template>
  <q-page style="background-color: #fdebc7 ">

    <div class="q-gutter-md row items-start">
      <q-input v-model="texto" color="verde" label="Buscar" label-color="light-green-9" style="width: 400px">
        <template v-slot:append>
          <q-btn flat color="light-green-9" style="background-color: #fdebc7" @click="filtrarNombre"  icon="search">
          </q-btn>
        </template>
      </q-input>

      <q-select borderless
                color="light-green-9"
                v-model="tags"
                multiple
                :options="this.tagsMaterial"
                bg-color="#fdebc7"
                label-color="light-green-9"
                style="min-width: 50px; max-width: 200px; color: #7FA949 ">
        <template v-slot:append>
          <q-icon name="local_offer" color="light-green-9" @click="filtrarTag" />
        </template>
      </q-select>
    </div>

    <div>
      <br>
      <p style="color: #7FA949; font-size: 18px" align="center">Centros de acopio</p>
    </div>

    <div class="relative-position container   flex flex-center" style="margin-top: 30px; ">
      <GmapMap
        :center="ubicacion"
        :zoom="13"
        map-type-id="roadmap"
        style="width: 750px; height: 450px"
      >

        <GmapMarker
          v-for="centro in centrosAcopioFiltrados"
          :position="{lat:  centro.lat , lng: centro.lng}"
          :draggable="false"
          :clickable="true"
          @click="seleccionarCentro(centro)"
        />

        <GmapMarker :position="ubicacion"
                    :icon="{url: require('../assets/person_pin_circle.svg'),
                    scaledSize: {width: 50, height: 60},
                    }"
        />


      </GmapMap>
    </div>

    <q-btn
      :icon="{ url: require('../assets/person_pin_circle.svg')}"
    />
  </q-page>
</template>


<script lang="ts">

import Vue from 'vue'
import { Vue, Component } from 'vue-property-decorator';
import * as VueGoogleMaps from 'vue2-google-maps'
const {StringUtils} = require('turbocommons-ts');
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCvJo0DJMLi_DQFL_nw_XC0M2LFzU-YK40'
  }
})

@Component
export default class cercaAmi extends Vue {

  texto=undefined

  data() {
    return {
      model: null,
      multiple: null,
      origen:{
        lat: undefined,
        lng: undefined
      }
    }
  }

  tags=[]
  centrosAcopioFiltrados= this.listaCentroCA
  centrofiltrado:CentroAcopio[] =[];
  modelmultiple:String[]=[];

  filtro(){
    return this.texto
  }

  buscar() {
    this.centros.forEach((centro)=>{
      if(centro.nombre.indexOf(this.texto) !== -1){
        this.centrofiltrado.push(centro);
      }
    })
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
    })
  }

  beforeDestroy () {
    // we do cleanup
    Geolocation.clearWatch(this.geoId)
  }

  get ubicacion(){
    return this.$store.state.store_CA.ubicacionActual
  }

  setUbicacion(val){
    this.$store.commit('store_CA/updateUbicacion', val)
  }

  get listaCentroCA(){
    return this.$store.state.store_CA.centrosCA
  }

  get tagsMaterial(){
    return this.$store.state.store_CA.tags
  }

  get listacentrobus(){
    return this.$store.state.store_CA.centrobus
  }

  setCentroElegido(val){
    this.$store.commit('store_CA/updateCentroElegido', val)
  }

  seleccionarCentro(centro){
    this.setCentroElegido(centro)
    this.$router.push('/ruta')
  }


  filtrarNombre(){
    this.centrosAcopioFiltrados = [];
    this.listaCentroCA.forEach((centro)=>{
      if(StringUtils.compareSimilarityPercent(this.texto, centro.nombre)>25)
      {
        this.centrosAcopioFiltrados.push(centro)
      }
    })
  }


  filtrarTag(){
    this.centrosAcopioFiltrados = [];
    this.tags.forEach((tag)=>{
      this.listaCentroCA.forEach((centro)=>{
        if(centro.tags.some((tagCentro)=>{
          if(!this.centrosAcopioFiltrados.includes(centro) && tag == tagCentro){
            this.centrosAcopioFiltrados.push(centro);
            return true;
          }
        }));
      })
    })
  }


  get centroElegido () {
    return this.$store.state.store_CA.centroElegido
  }

  prueba(){
    console.log(this.texto)

  }


}

</script>
<style scoped>

</style>
