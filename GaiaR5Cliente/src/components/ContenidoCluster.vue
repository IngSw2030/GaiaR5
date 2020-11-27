<template>
  <div>
    <template v-if="elemento.tipo === 0">
      <p>{{ elemento.texto }}</p>
    </template>
    <template v-else-if="elemento.tipo === 1">
      <q-img
        :src="elemento.enlace"
        spinner-color="white"
        style="height: 140px; max-width: 150px"
      />
    </template>
    <template v-else>
      <q-video
        :src="elemento.enlace"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import CentroAcopioBusqueda from "./CentroAcopioBusqueda.vue";
import Contenido from "../../../entidades/Contenido";

@Component({
  components: {CentroAcopioBusqueda}
})
export default class ContenidoCluster extends Vue {
  @Prop() elemento!: Contenido;
}
</script>

<style scoped>

</style>
