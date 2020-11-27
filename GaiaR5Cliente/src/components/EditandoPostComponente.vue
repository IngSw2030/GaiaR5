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

    <q-input class="q-mx-md"  v-model="tituloPost" label="titulo" stack-label :dense="dense" />

    <q-separator />


    <q-card-section class="col-4">
        <q-input
          v-model="contenidoPost"
          placeholder="¿De Qué quieres hablar?"
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
      <q-input v-model="tagEntrante" standout="bg-light-green text-white"  label="Tags">
      <template v-slot:prepend>
        <q-icon name="label" />
      </template>
        <template
          v-slot:append>
          <q-btn  dense flat icon="add" @click="agregarTag" />
        </template>
      </q-input>
    </q-card-section>


    <q-separator />

    <q-card-section>
      <q-chip removable  style="background-color: #fbf5d8" v-for="tag in listaTags" icon="label" :label="tag"  text-color="light-green" />
    </q-card-section>


  </q-card>




</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {Post, Usuario} from "../../../entidades"

@Component
export default class PostComponente extends Vue  {

@Prop() postEnviado!: Post

  contenidoPost: string="";
  tagEntrante: string="";
  tituloPost: string="";

autor: Usuario=new Usuario(
  "Pepito perez",
  "1018499372",
  5000
)

 listaTags: string []= [
   "aluminio",
   "vidrio",
   "paz mundial"
 ]



  agregarTag(){
  if(this.tagEntrante!="")
   this.listaTags.push(this.tagEntrante)
  }

 // beforeCreated() {
   // this.listaTags=this.postEnviado.tags;
  //}

  //cedula del usuario

  crearPost(){
   let postCreado: Post= new Post(
      "1013632535",
      Date.now(),
      this.tituloPost,
      this.listaTags,
      undefined,
      undefined,
      []

    )
  }

  imprimir(){
    console.log(this.listaTags)
  }


}

</script>

<style scoped>

</style>
