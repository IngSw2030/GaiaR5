<template>
  <q-page >

    <post-componente class="q-ma-xl"  :post-enviado="variablePost"/>
    <comentario-componente class="q-my-md"  v-for="coment in listaComent" :comentario-enviado="coment"/>
    <q-input standout="bg-light-green text-white" v-model="text" label="¿Qué opinas de este post?" />

  </q-page>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Post, Comentario} from "../../../entidades"
import PostComponente from "./PostComponente.vue";
import ComentarioComponente from "components/ComentarioComponente.vue";



@Component({
  components: {
    PostComponente,
    ComentarioComponente
  }
})

export default class PaginaInicio extends Vue {


  variablePost: Post =new Post(
    "1018499372",
    Date.now(),
    "cultivos hidroponicos",
    ["tierra", "amor"]
  )

  listaComent: Comentario[]=[
    new Comentario(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      1
    ),
    new Comentario(
      "Hola bebe",
      2
    )

  ]


  variableComent: Comentario =new Comentario(
    "Hola bebe",
    1
  )

}


</script>


<style>

</style>
