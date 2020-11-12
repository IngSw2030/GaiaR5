<template>
  <q-page >

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
