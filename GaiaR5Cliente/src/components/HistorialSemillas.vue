<template>
  <q-page padding style="background-color: #fdebc7">

    <div align="center">
      <q-img
        width="215px"
        height="265px"
        src="https://www.pngkey.com/png/full/59-595509_drawing-tree-root-arbol-con-raices-dibujo.png"

      />
    </div>
    <q-item v-for="(cedula) in usuarios" :key="'cedula'" class="relative-position container   flex flex-center" style=" margin-top: 1px; margin-bottom: 0px">
      <p style="border:green 2px solid  ; border-radius: 20px ; padding: 20px; width: 500px; margin-bottom: 0px">
        Semillas
      </p>
    </q-item>
    <q-item class="relative-position container   flex flex-center">
      <p
        style="border:green 2px solid  ; border-radius: 20px ; padding: 20px; width: 500px;margin-top: 1px ; margin-bottom: 1px">
        Semillas
      </p>
    </q-item>
    <q-item class="relative-position container   flex flex-center">
      <p style="border:green 2px solid  ; border-radius: 20px ; padding: 20px; width: 500px">
        Semillas
      </p>
    </q-item>
    <q-item class="column justify-center full-height full-width text-center">
      <div class="text-weight-bold" style="color: #7FA949;margin-top: 1px; ">
        <div class="text-center" style="font-size: 2.7ex;">¿Cómo acumular semillas?</div>
      </div>

      <div>
        <q-btn color="light-green" label="Continuar" @click="showNotif" style="margin-top: 3px; "></q-btn>
      </div>
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
  semillas: number;
  usuarios: number;

    showNotif() {
    this.$q.notify({
                     message: 'Visita centros de acopio de la ciudad y registra tu visita',
                     color: 'light-green',
                     multiLine: true,
                     actions: [
                       {label: 'Buscar Centros de Acopio' , color: 'yellow', handler: () => { /* ... */}},
                     ]
                   })

  }


  get acumSemillas(){
    return this.$store.state.store_CA.acumSemillas
  }


}
</script>

<style scoped>

</style>
