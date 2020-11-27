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

    <q-input class="q-mx-md"  v-model="tituloPost" label="titulo" stack-label  />

    <q-separator />


    <q-card-section class="col-4">
        <q-input
          v-model="contenidoPost"
          placeholder="¿De Qué quieres hablar?"
          type="textarea"
        />
      </q-card-section>

    <q-card-section v-if="prueba" class="col-4">

      <q-img
        class="rounded-borders"
        src="https://i.imgur.com/6RhP8BS.jpg"
      />

    </q-card-section>


    <q-separator />

    <q-card-actions >
      <q-btn flat round class="q-mx-xl" color="light-green" icon="insert_link" @click="desplegarVentana" />

      <q-dialog v-model="ventanaLink" persistent transition-show="flip-down" transition-hide="flip-up">
        <q-card class="bg-light-green text-white">
          <q-bar>

            <q-btn  flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section class="column relative-position container   flex flex-center">
            <div class="text-h10">Ingresa el link de la imagen que deseas agregar:</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input class="q-mb-sm" v-model="enlaceImagen" label-color="white" />
            <q-space/>
            <div class="column relative-position container   flex flex-center" >
              <q-btn  color="primary" label="publicar" @click="agregarLink" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>


    </q-card-actions>

    <q-separator />
    <q-card-section class="col-4">
      <q-input v-model="tagEntrante" standout="bg-light-green text-white"  label="Tags">
      <template v-slot:prepend>
        <q-icon name="label" />
      </template>
        <template
          v-slot:append>
          <q-btn  flat icon="add" @click="agregarTag" />
        </template>
      </q-input>
    </q-card-section>


    <q-separator />

    <q-card-section>
      <q-chip  style="background-color: #fbf5d8" v-for="(tag, index) in listaTags" icon="label" :label="tag"  text-color="light-green" >
        <q-btn
          class="q-mx-xs"
          round
          size='xs'
          icon="cancel"
          @click="removeTag(index)"
        />
      </q-chip >
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
  ventanaLink:boolean=false;
  listaTags: string []= [
    "aluminio",
    "vidrio",
    "paz mundial"
  ]
  enlaceImagen: string="";
  prueba:boolean=true;



autor: Usuario=new Usuario(
  "Pepito perez",
  "1018499372",
  5000
)

  agregarTag(){
  if(this.tagEntrante!="")
   this.listaTags.push(this.tagEntrante)
  }

  desplegarVentana(){
    this.ventanaLink=true;
  }

  cerrarVentana(){
    this.ventanaLink=false;
  }

 // beforeCreated() {
   // this.listaTags=this.postEnviado.tags;
  //}


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

  removeTag ( index: number ) {
      this.listaTags.splice( index, 1 );
  }

  imprimir(){
    console.log(this.listaTags)
  }


}

</script>

<style scoped>

</style>
