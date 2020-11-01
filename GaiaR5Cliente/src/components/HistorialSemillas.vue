<template>
  <q-page padding style="background-color: #fdebc7">

    <div align="center">
      <q-img
        width="215px"
        height="265px"
        src="https://www.pngkey.com/png/full/59-595509_drawing-tree-root-arbol-con-raices-dibujo.png"

      />

      <p class="text-weight-bold"  style="font-size: 3rem;color: #7FA949;"> Semillas: {{acumSemillas}} </p>
    </div>

    <q-item class="column relative-position container   flex flex-center" >
      <p class="column" style="border:green 2px solid  ; border-radius: 20px ; padding: 20px; width: 500px"
        v-for="centro in listaCentroCA">
        Visita a:
        <q-card-section v-html="centro.nombre" style="color: darkslategrey; font-size: 17px " />
        23/00/2020
        500 Semillas obtenidas
      </p>
    </q-item>
    <q-item class="column justify-center full-height full-width text-center">
    </q-item>
  </q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import CentroAcopioBusqueda from "components/CentroAcopioBusqueda.vue";
import CentroAcopio from "../api/clases/CentroAcopioBusqueda";

@Component({
  components: {HistorialSemillas}
})
export default class HistorialSemillas extends Vue {

  get listaCentroCA(){
    return this.$store.state.store_CA.centrosCA
  }
  get acumSemillas(){
    return this.$store.state.store_CA.acumSemillas
  }

  get centroElegido () {
    return this.$store.state.store_CA.centroElegido
  }

}
</script>

<style scoped>

</style>
