<template>

  <q-card class="my-card" flat bordered>
    <q-item>
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
    </q-item>

    <q-separator />

    <q-card-section>

      <q-card-section class="q-pt-xs">
        <div class="text-caption text-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>

      <q-card-section class="col-5 flex flex-center">
        <q-img
          class="rounded-borders"
          src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
      </q-card-section>

      <q-separator />

    </q-card-section>

    <q-card-actions >
      <q-btn flat round class="q-mx-xl" color="light-green" icon="eco" />
      <q-btn flat round class="q-mx-xl" color="light-green" icon="delete_forever" />
      <q-btn flat round class="q-mx-xl" color="light-green" icon="create" />
      <q-btn flat round class="q-mx-xl" color="light-green" icon="reply_all" />

    </q-card-actions>

    <q-separator />

    <q-card-section>
      <q-chip v-for="tag in postEnviado.tags" icon="label" label=tag color="white" text-color="light-green" />
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


}

</script>

<style scoped>

</style>
