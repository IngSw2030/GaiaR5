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
        <q-input
          placeholder="¿De Qué quieres hablar?" :dense="dense"
          v-model="text"
          type="textarea"
        />
      </q-card-section>


    <q-separator />

    <q-card-actions >
      <q-btn flat round class="q-mx-xl" color="light-green" icon="eco" />
      <q-btn flat round class="q-mx-xl" color="light-green" icon="delete_forever" />

    </q-card-actions>

    <q-separator />
    <q-card-section class="col-4">
      <q-input standout="bg-light-green text-white" v-model="text" label="Tags">
      <template v-slot:prepend>
        <q-icon name="label" />
      </template>
        <template v-slot:append>
          <q-btn  dense flat icon="add" />
        </template>
      </q-input>
    </q-card-section>


    <q-separator />

    <q-card-section>
      <q-chip v-for="tag in listaTags" icon="label" label=tag color="white" text-color="light-green" />
    </q-card-section>


  </q-card>




</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {Post, Usuario} from "../../../entidades"

@Component
export default class PostComponente extends Vue  {

@Prop() postEnviado!: Post


autor: Usuario=new Usuario(
  "Pepito perez",
  "1018499372",
  5000
)

 listaTags= [
   "aluminio",
   "vidrio",
   "paz mundial"
 ]


}

</script>

<style scoped>

</style>
