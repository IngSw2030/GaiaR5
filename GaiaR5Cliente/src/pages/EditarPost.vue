<template>
  <q-page style="background-color: #fdebc7">
    <q-list>
      <q-item v-for="(itemContenido, indice) in contenido" :key="`${itemContenido.tipo}:${indice}`">
        <q-item-section>
          <contenido-cluster :elemento="itemContenido"/>
        </q-item-section>
      </q-item>
    </q-list>
    <q-select v-model="selector" :options="opciones" label="Tipo de contenido" emit-value/>
    <q-input v-model="dataSeleccion"/>
    <q-btn label="Añadir" @click="sumarSeleccion"/>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Contenido, {TipoContenido} from "../../../entidades/Contenido";
import ContenidoCluster from "components/ContenidoCluster.vue";

@Component({
  components: {ContenidoCluster}
})
export default class PageIndex extends Vue {
  public contenido: Contenido[] = [];
  public selector: string = "";
  public opciones = [
    {label: "Parrafo", value: "PARRAFO"},
    {label: "Imagen", value: "IMAGEN"},
    {label: "Video", value: "VIDEO"}
  ];
  public dataSeleccion: string = "";

  public sumarSeleccion() {
    console.log(this.selector);
    switch (this.selector) {
      case "PARRAFO":
        this.contenido.push(new Contenido(TipoContenido.PARRAFO, this.dataSeleccion, ""));
        break;
      case "IMAGEN":
        this.contenido.push(new Contenido(TipoContenido.IMAGEN, "", this.dataSeleccion));
        break;
      case "VIDEO":
        this.contenido.push(new Contenido(TipoContenido.VIDEO, "", this.dataSeleccion));
        break;
    }
    this.selector = "";
    this.dataSeleccion = "";
    console.log(this.contenido);
  }
};
</script>
<style>

</style>
