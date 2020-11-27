<template>

  <q-card  class="my-card" flat bordered style="background-color: #fbf5d8">
    <q-item >
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label> {{autor.nombre}} </q-item-label>
        <q-item-label caption>
          {{postEnviado.titulo}}
        </q-item-label>
      </q-item-section>

      <div class="column relative-position container   flex flex-right" >
        <q-chip square  style="background-color: #fbf5d8" >
          <q-avatar color="light-green" text-color="white">{{postEnviado.likes}}</q-avatar>
          Me gusta
          <q-icon name="eco" />
        </q-chip>
      </div>

    </q-item>

    <q-separator />


    <q-card-section >

      <q-item clickable>

        <q-card-section class="q-pt-xs" >
          <div class="text-caption text-dark">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>

          <div class="column relative-position container   flex flex-center">
            <q-img
              class="rounded-borders"
              src="https://i.imgur.com/6RhP8BS.jpg"
            />

            <div class="q-pa-md">
              <div class="q-video">
                <iframe
                  src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
                  frameborder="0"
                  allowfullscreen
                />
              </div>
            </div>

          </div>

        </q-card-section>

      </q-item>

      <q-separator />

    </q-card-section>

    <q-card-actions >

      <q-chip style="background-color: #fbf5d8" :selected.sync="botonLike" text-color="light-green"  icon="eco" clickable @click="darLike">
        Me gusta
      </q-chip>

      <q-chip style="background-color: #fbf5d8" text-color="light-green"  icon="delete_forever" clickable>
        Reportar
      </q-chip>


      <q-chip style="background-color: #fbf5d8" text-color="light-green"  icon="create" clickable>
      editar
      </q-chip>


    </q-card-actions>

    <q-separator />

    <q-card-section>
      <q-chip style="background-color: #fbf5d8" v-for="tag in postEnviado.tags" icon="label" :label="tag"  text-color="light-green" />
    </q-card-section>

  </q-card>




</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {Post, Usuario} from "../../../entidades"

@Component
export default class PostComponente extends Vue  {

@Prop() postEnviado!: Post

 botonLike: boolean=false;

autor: Usuario=new Usuario(
  "Pepito perez",
  "1018499372",
  5000
)


  darLike(){
  //this.botonLike=this.botonLike;
    console.log("me gusta");
  }

}

</script>

<style scoped>

</style>
