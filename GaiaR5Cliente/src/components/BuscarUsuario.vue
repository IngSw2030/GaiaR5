<template>
  <q-page style="background-color: #fdebc7 ">
   <br>
    <div class="q-gutter-md row items-start">
      <q-input rounded outlined v-model="texto" color="light-green-9" label="Buscar Usuarios" label-color="light-green-10" style="width: 400px" @input="filtrarNombreUsuario" >
        <template v-slot:prepend>
          <q-icon color="light-green-9" name="search">
          </q-icon>
        </template>
        <template v-slot:before>
          <q-icon color="light-green-9" name="keyboard_backspace">
          </q-icon>
        </template>
      </q-input>
    </div>
    <br>
    <div style="color: #fdebc7; background-color: #fdebc7">
      <q-chip class ="row"
              style="background: #fdebc7"
              v-for="centro in centrosAcopioFiltrados">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar rounded size="32px">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label caption blond  v-html=centro.nombre style="color: #7FA949; font-size: 15px; width:300px" ></q-item-label>
            </q-item-section>
            <br><br>
          </q-item>
          <br>
        </q-chip>
        <br>
    </div>
  </q-page>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Vue, Component } from 'vue-property-decorator';
import CentroAcopioBusqueda from "components/CentroAcopioBusqueda.vue";
import CentroAcopio from "../api/clases/CentroAcopioBusqueda";
const {StringUtils} = require('turbocommons-ts');

@Component({
  components: { CentroAcopioBusqueda }
})

export default class BuscarUsuario extends Vue {

  texto=undefined

  data() {
    return {
      model: null,
      multiple: null,
    }
  }

  centrosAcopioFiltrados= this.listaCentroCA

  centrofiltrado:CentroAcopio[] =[];
  modelmultiple:String[]=[];

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
    this.$router.push('/info')
  }


  filtrarNombreUsuario(){
    this.centrosAcopioFiltrados = [];
    this.listaCentroCA.forEach((centro)=>{
      if(StringUtils.compareSimilarityPercent(this.texto, centro.nombre)>25)
      {
        this.centrosAcopioFiltrados.push(centro)
      }
    })
  }

  prueba(){
    console.log(this.texto)
  }
}
</script>

<style scoped>
</style>
