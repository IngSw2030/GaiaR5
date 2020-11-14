<template>

  <q-card class="my-card" flat bordered style="background-color: #fbf5d8">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label> {{autor.nombre}} </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

      <q-card-section class="col-4">
        {{comentarioEnviado.texto}}
      </q-card-section>


    <q-separator />

    <q-card-actions >
      <q-btn flat round class="q-mx-xl" color="light-green" icon="eco" />
      <q-btn flat round class="q-mx-xl" color="light-green" icon="delete_forever" />

    </q-card-actions>

  </q-card>




</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {Post, Usuario, Comentario} from "../../../entidades"

@Component
export default class PostComponente extends Vue  {

@Prop() comentarioEnviado!: Comentario


autor: Usuario=new Usuario(
  "Pepito perez",
  "1018499372",
  5000
)


}

</script>

<style scoped>

</style>
