<template>
  <q-page style="background-color: #fdebc7">

    <q-input class="q-mx-xs" v-model="texto" color="verde" label="Buscar" label-color="light-green-9" >
      <template v-slot:append>
        <q-btn color="light-green-9" flat icon="search" style="background-color: #fdebc7" @click="buscar">
        </q-btn>
      </template>
    </q-input>

    <div class="q-gutter-sm">
      <q-radio v-model="shape" val="name" label="Busqueda por nombre" color="light-green" />
      <q-radio v-model="shape" val="tag" label="Busqueda por tag" color="light-green" />
    </div>



    <post-componente class="q-ma-xl" v-for="post in listaPost" :post-enviado="post"/>


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
import {Post} from "../../../entidades"
import PostComponente from "./PostComponente.vue";



@Component({
  components: {
    PostComponente
  }
})

export default class PaginaInicio extends Vue {


  listaPost: Post []=[new Post(
    "1018499372",
    Date.now(),
    "cultivos hidroponicos",
    ["tierra", "amor"]
  ),

    new Post(
      "123456789",
      Date.now(),
      "reciclar vidrio",
      ["vidrio"]
    )

  ]


}


</script>


<style>

</style>
