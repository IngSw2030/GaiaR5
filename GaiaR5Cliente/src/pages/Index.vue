<template>
  <q-page style="background-color: #fdebc7">
    <div class="row">
      <div class="col-8">
        <q-select style="background-color: #fdebc7"
          filled  bg-color="#fdebc7"
          v-model="tags"
          multiple
          :options="opciones"
          label="Tags" color="light-green"
          class="full-width">
        </q-select>
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
  opciones: String[] = ['Plastico', 'Vidrio', 'Madera', 'Carton', 'Metal', "Pizza"];
  centrosAcopio: CentroAcopio[] = [];
  centrosAcopioFiltrados: CentroAcopio[] = [];

  filtrar(){
    this.$axios.post("http://localhost:4557/buscar-acopio", {
      filtro: this.tags
    }).then((res=>{
      console.log(res);
      this.centrosAcopio = res.data;
      this.$q.notify(`Felicitaciones encontraste ${this.centrosAcopio.length} centros de acopio`);
      this.$q.dialog({
        title: 'Felicidades',
        message: `Felicitaciones encontraste ${this.centrosAcopio.length} centros de acopio`
      });
    }))
  }
};
</script>
<style>

</style>
