<template>
  <q-page style="background-color: #fdebc7">

    <q-item  active clickable v-ripple fixed-right >
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 5ex; " />
      </q-item-section>
    </q-item>

    <editando-post-componente class="q-ma-xl"  :post-enviado="variablePost"/>


    <div class="column relative-position container   flex flex-center" >
      <q-btn class="q-my-xs"  color="light-green">
        <div class="row items-center no-wrap">
          <q-icon left name="post_add" />
          <div class="text-center">
            Postealo
          </div>
        </div>
      </q-btn>
    </div>

  </q-page>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Post} from "../../../entidades"
import EditandoPostComponente from "./EditandoPostComponente.vue";



@Component({
  components: {
    EditandoPostComponente
  }
})

export default class PaginaInicio extends Vue {


  variablePost: Post =new Post(
    "1018499372",
    Date.now(),
    "cultivos hidroponicos",
    ["tierra", "amor"]
  )


  //llamar a la Bd usaurio

  crearpost()
  {
    new Post(
      "1013632535",
      Date.now(),
      "cultivos hidroponicos",
      ["tierra", "amor"]
    )
  }



}



</script>


<style>

</style>
