<template>
  <q-page style="background-color: #fdebc7">
    <template v-if="usuario">
      <p>{{ usuario.nombre }}</p>
      <p>{{ usuario.cedula }}</p>
      <p>{{ usuario.email }}</p>
      <q-img
        :src="usuario.avatar"
        spinner-color="white"
        style="height: 140px; max-width: 150px"
      />
      {{post}}
    </template>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Usuario} from "../../../entidades/index";
import Controlador from "../api/Controlador";
import Post from "../../../entidades/Post";

@Component({})
export default class ContenidoCluster extends Vue {
  usuario: Usuario | null = null;
  post: Post[] | null = null;

  async mounted() {
    try {
      let consulta = await Controlador.get("usuario", {
        params: {
          cedula: this.$route.params.cedula
        }
      });
      this.usuario = consulta.data;
      consulta = await Controlador.get("post/usuario", {
        params: {
          cedula: this.$route.params.cedula
        }
      });
      this.post = consulta.data;
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped>

</style>
