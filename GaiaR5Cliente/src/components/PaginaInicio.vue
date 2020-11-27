<template>
  <q-page style="background-color: #fdebc7">

    <q-input class="q-mx-xs" v-model="parametroBusqueda" color="verde" label="Buscar" label-color="light-green-9" >
      <template v-slot:append>
        <q-btn color="light-green-9" flat icon="search" style="background-color: #fdebc7" >
        </q-btn>
      </template>
    </q-input>

    <div class="q-gutter-sm">
      <q-radio v-model="tipoBusqueda" val="name" label="Busqueda por nombre" color="light-green" />
      <q-radio v-model="tipoBusqueda" val="tag" label="Busqueda por tag" color="light-green" />
    </div>



    <post-componente  class="q-ma-xl" v-for="post in listaPost" :post-enviado="post"/>


    <div class="relative-position container   flex flex-center">
    <q-circular-progress
      indeterminate
      size="50px"
      color="light-green"
      class="q-ma-md"
    />
      </div>
  </q-page>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Post, Comentario} from "../../../entidades"
import PostComponente from "./PostComponente.vue";



@Component({
  components: {
    PostComponente
  }
})

export default class PaginaInicio extends Vue {

  tipoBusqueda: string="";
  parametroBusqueda: string="";

  listaPost: Post []=[new Post(
    "1018499372",
    Date.now(),
    "cultivos hidroponicos",
    ["tierra", "amor"],
    10,
    //[
    //new comentario("me parece muy bien",6),
    //new comentario("Me parece genial que el gobierno por fin este apoyando este tipo de proyectos",7)
    //],
    //["https://i.imgur.com/6RhP8BS.jpg"]

  ),

    new Post(
      "123456789",
      Date.now(),
      "reciclar vidrio",
      ["vidrio"],
      50,
      //[
      //new comentario("wow que visaje",10),
      //new comentario("Buen post",3)
      //],
      //["https://i.imgur.com/Ug2g2Re.gifv"]
    )

  ]


  imprimirConsola(){
    console.log("funciona")
  }


}


</script>


<style>

</style>
