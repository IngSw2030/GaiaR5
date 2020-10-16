<template>
  <q-page style="background-color: #fdebc7">
    <div class="row">
      <div class="col-8">
        <q-select
          filled
          v-model="tags"
          multiple
          :options="opciones"
          label="Tags"
          style="width: 250px"
          class="full-width"
        />
      </div>
      <div class="col-4">
        <q-btn label="Buscar" icon="search" @click="filtrar" color="light-green" glossy class="full-width"/>
      </div>
    </div>
    <div class="row full-width">
      <q-list bordered separator class="full-width">
        <q-item v-for="(centro, indice) in centrosAcopio" :key="'centro'+centro.nombre+indice">
          <q-item-section>
            <centro-acopio-busqueda :centro="centro"/>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CentroAcopioBusqueda from "components/CentroAcopioBusqueda.vue";
import CentroAcopio from "../api/clases/CentroAcopioBusqueda";

@Component({
  components: { CentroAcopioBusqueda }
})
export default class PageIndex extends Vue {
  tags:String[] = [];
  opciones: String[] = [];
  centrosAcopio: CentroAcopio[] = [];
  centrosAcopioFiltrados: CentroAcopio[] = [];

  filtrar(){
    this.$axios.post("http://f00b0e326316.ngrok.io/centrosAcopio/obtenerCentrosPorRecurso", {
      recurso: this.tags
    }).then((res=>{
      console.log(res);
      this.centrosAcopio = res.data;

    }))
  }

  mounted(){
    this.$axios.get("http://f00b0e326316.ngrok.io/centrosAcopio/obtenerRecursos").then((res)=>{
      console.log(res);
      this.opciones = res.data;
    }).catch((error)=>{
      console.log(error);
    });
  }


};
</script>
<style>

</style>
