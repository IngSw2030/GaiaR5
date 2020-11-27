<template>
  <q-page  style="background-color: #fdebc7">

    <q-item  active clickable v-ripple fixed-right >
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 5ex; " />
      </q-item-section>
    </q-item>

    <post-componente class="q-my-md"  :post-enviado="variablePost"/>
    <comentario-componente class="q-my-md"  v-for="coment in listaComent" :comentario-enviado="coment"/>
    <q-input standout="bg-light-green text-white" v-model="nuevoComentario" label="¿Qué opinas de este post?">
      <template v-slot:prepend>
        <q-icon name="label" />
      </template>
      <template v-slot:append>
        <q-btn  dense flat icon="send" />
      </template>
    </q-input>

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

  nuevoComentario: string="";

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


  crearPost (){

  }


}




</script>


<style>

</style>
