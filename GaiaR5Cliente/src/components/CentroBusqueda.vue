<template>
  <q-page style="background-color: #fdebc7 ">
    <div v-if="!centroElegido">
      <div class="q-gutter-md row items-start">
        <q-input v-model="texto" color="verde" label="Buscar" label-color="light-green-9" style="width: 400px">
          <template v-slot:append>
            <q-btn color="light-green-9" flat icon="search" style="background-color: #fdebc7" @click="buscar">
            </q-btn>
          </template>
        </q-input>
        <q-select v-model="tags"
                  :options="tagsMaterial"
                  bg-color="#fdebc7"
                  borderless
                  color="light-green-9"
                  label-color="light-green-9"
                  multiple
                  style="min-width: 50px; max-width: 200px; color: #7FA949 ">
        </q-select>
      </div>

      <div>
        <br>
        <p align="center" style="color: #7FA949; font-size: 18px">Centros de acopio</p>
      </div>
      <q-list>
        <q-item v-for="(centro, indice) in centrosBack" :key="`${centro.nombre}:${indice}`"
                clickable style="background: #fdebc7" @click="seleccionarCentro(centro)">
          <q-item-label>{{ centro.nombre }}</q-item-label>
        </q-item>
      </q-list>
    </div>
    <div v-else>
      <info-centro-acopio :centro="centroElegido" @volver="limpiarCentroElegido"/>
    </div>
  </q-page>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CentroAcopioBusqueda from "components/CentroAcopioBusqueda.vue";
import {CentroAcopio} from "../../../entidades";
import infoCentroAcopio from "components/InfoCentroAcopio.vue";
import Controlador from "../api/Controlador";
import {evaAward} from "@quasar/extras/eva-icons";

const {StringUtils} = require('turbocommons-ts');
const url = "http://6684480d9141.ngrok.io";

@Component({
  components: {
    CentroAcopioBusqueda,
    infoCentroAcopio
  }
})

export default class CentroBusqueda extends Vue {
  centrosBack: CentroAcopio[] = [];
  texto = ""
  tags = []
  centrosAcopioFiltrados = this.listaCentroCA
  centroElegido: CentroAcopio | null = null;
  model = null;
  multiple = null;
  centrofiltrado: CentroAcopio[] = [];
  modelmultiple: String[] = [];

  get listaCentroCA() {
    return this.$store.state.store_CA.centrosCA
  }

  get tagsMaterial() {
    return this.$store.state.store_CA.tags
  }

  get listacentrobus() {
    return this.$store.state.store_CA.centrobus
  }

  filtro() {
    return this.texto
  }

  async buscar() {
    try {
      let resultado:any = await Controlador.get("centroAcopio", {
        params: {
          nombre: this.texto
        }
      });
      let centro = resultado.data;
      this.centrosBack = [];
      let centroNuevo = new CentroAcopio(centro.nombre, centro.direccion, centro.latitud, centro.longitud);
      //centroNuevo.tags = JSON.parse(centroNuevo.tags);
      this.centrosBack.push(centroNuevo);
      console.log(this.centrosBack);
    }catch (e){
      this.$q.notify(`Ocurrio un error: ${e.message}`);
    }
  }

  setCentroElegido(val: any) {
    this.$store.commit('store_CA/updateCentroElegido', val);
  }

  seleccionarCentro(centro: CentroAcopio) {
    this.centroElegido = centro;
  }


  filtrarNombre() {
    this.centrosAcopioFiltrados = [];
    this.listaCentroCA.forEach((centro: any) => {
      if (StringUtils.compareSimilarityPercent(this.texto, centro.nombre) > 25) {
        this.centrosAcopioFiltrados.push(centro)
      }
    })
  }


  /*filtrarTag() {
    this.centrosAcopioFiltrados = [];
    this.tags.forEach((tag) => {
      this.listaCentroCA.forEach((centro:any) => {
        if (centro.tags.some((tagCentro:any) => {
          if (!this.centrosAcopioFiltrados.includes(centro) && tag == tagCentro) {
            this.centrosAcopioFiltrados.push(centro);
            return true;
          }
        }))
      })
    })
  }*/


  prueba() {
    console.log(this.texto)
  }

  async mounted() {
    let recursos = (await Controlador.get("recursos")).data;
    this.$store.commit('store_CA/updateTags', recursos);
  }

  limpiarCentroElegido(){
    this.centroElegido = null;
  }


}

</script>
<style scoped>
.botonAcopio {
  color: black;
  font-size: 15px;
  width: 300px;
  height: 50px
}
</style>
