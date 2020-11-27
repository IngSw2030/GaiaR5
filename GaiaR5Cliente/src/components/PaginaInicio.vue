<template>
  <q-page style="background-color: #fdebc7">


    <div v-if="!postElegido" >
      <q-input class="q-mx-xs" v-model="parametroBusqueda" color="verde" label="Buscar" label-color="light-green-9" >
        <template v-slot:append>
          <q-btn color="light-green-9" flat icon="search" style="background-color: #fdebc7"   @click="buscar" >
          </q-btn>
        </template>
      </q-input>

      <div class="q-gutter-sm">
        <q-radio v-model="tipoBusqueda" val="name" label="Busqueda por nombre" color="light-green" />
        <q-radio v-model="tipoBusqueda" val="tag" label="Busqueda por tag" color="light-green" />
      </div>


      <post-componente  class="q-ma-xl" v-for="post in listaPost" :post-enviado="post" @click="seleccionarPost(post)"/>

    </div>

    <div v-else>
      <ver-post  class="q-ma-md"  :post-enviado="postElegido"/>
    </div>

  </q-page>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Post, Comentario} from "../../../entidades"
import PostComponente from "./PostComponente.vue";
import VerPost from "./VerPost.vue";
import Controlador from "../api/Controlador";



@Component({
  components: {
    PostComponente, VerPost
  }
})

export default class PaginaInicio extends Vue {

  tipoBusqueda: string="";
  parametroBusqueda: string="";
  pruebaPost="la vida es de los valientes";
  listaPost: Post []=[]

  postElegido: Post | null = null;


  async buscar() {
    try {
      let resultado:any = await Controlador.get("post", {
        params: {
          titulo: this.pruebaPost
        }
      });
      console.log(resultado);
      console.log(resultado.data[0].creador);
      let post = resultado.data[0];
      let postNuevo = new Post(post.creador, post.publicacion, post.titulo, post.tags, post.likes, post.comentarios, post.contenido);
      //centroNuevo.tags = JSON.parse(centroNuevo.tags);
      this.listaPost.push(postNuevo);
      console.log(this.listaPost);
    }catch (e){
      this.$q.notify(`Ocurrio un error: ${e.message}`);
    }
  }


  seleccionarPost(seleccion: Post) {
    this.postElegido= seleccion;
  }

  imprimirConsola(){
    console.log("funciona")
  }


}


</script>


<style>

</style>
