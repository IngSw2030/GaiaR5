<template>
  <q-page style="background-color: #fdebc7">

    <q-item  active clickable v-ripple fixed-right >
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 5ex; " />
      </q-item-section>
    </q-item>

    <editando-post-componente class="q-ma-xl"  :post-enviado="variablePost"/>

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

}


</script>


<style>

</style>
