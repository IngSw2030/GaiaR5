<template>
  <q-page style="background-color: #fdebc7">
    <div v-if="posts" style="background-color: #fbf5d8">
      <q-card v-for="post in posts" :key="`${post.creador}:${post.titulo}`" style="background-color: #fbf5d8">
        <post-componente :post-enviado="post"/>
      </q-card>
    </div>
    <div v-else>
      <q-card>
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text"/>
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text"/>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-skeleton height="200px" square/>
        <q-card-actions align="right" class="q-gutter-md">
          <q-skeleton type="QBtn"/>
          <q-skeleton type="QBtn"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PostComponente from "components/PostComponente.vue";
import Post from "../../../entidades/Post";
import Controlador from "../api/Controlador";

@Component({
  components: {
    PostComponente
  }
})
export default class PageIndex extends Vue {
  posts: Post[] | null = null;
  public async mounted(){
    let consulta = await Controlador.get("post/home");
    this.posts = consulta.data;
  }
};
</script>
<style>

</style>
