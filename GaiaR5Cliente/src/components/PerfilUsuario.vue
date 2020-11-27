<template xmlns:a="http://www.w3.org/1999/html">
  <q-page padding style="background-color: #fdebc7">
    <div to="/" active clickable v-ripple fixed-right
         style="display: flex;flex-direction: row;align-items:center;justify-content:start; align-content: center;">
      <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 5ex"/>
      <p style="color:#7FA949;"> Mi Perfil</p>
    </div>

    <div
      style="display: flex;flex-direction: column;align-content: center;align-items: center;justify-content: center;margin-top: 20px;color:#7FA949;background-color:#">
      <q-img
        width="80px"
        height="80px"
        :src="usuario.avatar"
      />
      <div
        style="cursor-pointer:hand;display: flex;flex-direction: column;align-content: center;align-items: center;justify-content: center;margin-top: 10px;color:darkgreen;margin-bottom: 0px">

        <p style="margin-bottom: 0px">{{ usuario.nombre }}</p>
        <p style="margin-top: 0px;margin-bottom:0px">{{ usuario.email }}</p>
        <p style="margin-top: 0px;margin-bottom: 0px">{{ usuario.rango }}}</p>

        <div align="center"
             style="margin-bottom: 0px;display:flex;flex-direction:row;align-content: center;align-items: center;justify-content: center;color:darkgreen">
          <p style="font-size: 12px;margin-bottom: 0px">20 Seguidores</p>
          <a href="" style="color:darkgreen;margin-bottom: 0px">
            <p align="center"
               style="color:darkgreen; font-size:12px;margin-top: 0px; margin-left: 7px;margin-bottom: 0px">
              Seguidos
            </p>
          </a>
        </div>
        <div align="center">
          <template>
            <q-btn flat label="Editar Perfil" size="10px" color="light-green-9"
                   style="text-transform:capitalize;margin-bottom: 0px;text-decoration: underline "></q-btn>
          </template>
        </div>
      </div>
      <div style="border-style:solid;width: 200px;border-radius: 2px;border-width: 1px;margin-top:0px"></div>
      <p style="text-align:start;font-size: 12px;color: #7FA949;font-weight: bold">Mis Posts</p>
      <q-card v-for="post in posts" :key="`${post.creador}:${post.titulo}`" style="background-color: #fbf5d8">
        <post-componente :post-enviado="post"/>
      </q-card>
    </div>


  </q-page>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Usuario} from "../../../entidades/index";
import Controlador from "../api/Controlador";
import PostComponente from "components/PostComponente.vue";
import Post from "../../../entidades/Post";
import {mdiPowerStandby} from "@quasar/extras/mdi-v5";

@Component({
  components: {PostComponente}
})
export default class ContenidoCluster extends Vue {
  usuario: Usuario | null = null;
  posts: Post[] | null = null;

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
      this.posts = consulta.data;
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
<style scoped>
p.centrar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
</style>

