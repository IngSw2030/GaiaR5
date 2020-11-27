<template>
  <q-item v-if="autor">
    <q-item-section avatar>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="autor.avatar">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ autor.nombre }}: </q-item-label>
        </q-item-section>
      </q-item>
    </q-item-section>
    <q-item-section>
      {{elemento.texto}}
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Comentario, Usuario} from "../../../entidades/index";
import Controlador from "../api/Controlador";

@Component({
  components: {}
})
export default class Comentario extends Vue {
  @Prop() elemento!: Comentario;
  autor: Usuario | null = null;

  async mounted(){
    let consulta = await Controlador.get("usuario", {
      params:{
        cedula: this.elemento.autor
      }
    });
    this.autor = consulta.data;
  }
}
</script>

<style scoped>

</style>
