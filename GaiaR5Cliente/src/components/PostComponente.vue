<template>
  <q-card v-if="autor" bordered class="my-card"  flat style="background-color: #fbf5d8">
    <q-item>
      <q-item-section>
        <q-chip class="titulo">{{ postEnviado.titulo }}</q-chip>
      </q-item-section>
      <q-item-section side>
        <q-chip square style="background-color: #fbf5d8">
          <q-avatar color="light-green" text-color="white">{{ postEnviado.likes }}</q-avatar>
          Me gusta
          <q-icon name="eco"/>
        </q-chip>
      </q-item-section>
    </q-item>
    <q-separator/>
    <q-card-section>
      <q-item clickable>
        <q-card-section class="q-pt-xs">
          <contenido-cluster v-for="(item, indice) in postEnviado.contenido" :key="`${postEnviado.titulo}:${indice}`"
                             :elemento="item"/>
        </q-card-section>
      </q-item>
    </q-card-section>
    <q-separator/>
    <q-item>
      <q-item-section>
        <div>
          <q-chip v-for="tag in postEnviado.tags" :label="tag" icon="label" style="background-color: #fbf5d8"
                  text-color="light-green"/>
        </div>
      </q-item-section>
      <q-item-section side>
        <q-item>
          <q-item-section avatar>
            <q-badge color="light-green-9" floating>Germinado</q-badge>
            <q-avatar>
              <img :src="autor.avatar">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ autor.nombre }}</q-item-label>
            <q-item-label caption lines="1">{{ autor.email }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-item-section>
    </q-item>
    <q-separator/>
    <q-item-section>
      <comentario-vue v-for="item in comentarios" :elemento="item" :key="`${postEnviado.titulo}:${item.publicacion}`"/>
    </q-item-section>
    <q-separator/>
    <q-card-actions>
      <q-chip :selected.sync="botonLike" clickable icon="eco" style="background-color: #fbf5d8" text-color="light-green"
              @click="darLike">
        Me gusta
      </q-chip>
      <q-chip clickable icon="speaker_notes" style="background-color: #fbf5d8" text-color="light-green"
              @click="comentar">
        Comentar
      </q-chip>
      <!--<q-chip clickable icon="delete_forever" style="background-color: #fbf5d8" text-color="light-green">
        Reportar
      </q-chip>
      <q-chip clickable icon="create" style="background-color: #fbf5d8" text-color="light-green">
        editar
      </q-chip>-->
    </q-card-actions>
    <q-card-section v-if="comentando">
      <q-input v-model="comentario" label="Comentario"/>
      <q-chip clickable icon="send" style="background-color: #fbf5d8" text-color="light-green"
              @click="enviarComentario">
        Enviar
      </q-chip>
      <q-chip clickable icon="cancel_schedule_send" style="background-color: #fbf5d8" text-color="light-green"
              @click="cancelarComentario">
        Cancelar
      </q-chip>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Comentario, Post, Usuario} from "../../../entidades"
import Controlador from "../api/Controlador";
import ContenidoCluster from "components/ContenidoCluster.vue";
import ComentarioVue from "components/Comentario.vue";

@Component({
  components: {
    ContenidoCluster,
    ComentarioVue
  }
})
export default class PostComponente extends Vue {
  @Prop() postEnviado!: Post
  botonLike: boolean = false;
  autor: Usuario | null = null;
  comentarios: Comentario[] = [];
  comentando: boolean = false;
  comentario: string = "";

  async mounted() {
    let consulta = await Controlador.get("usuario", {
      params: {
        cedula: this.postEnviado.creador
      }
    });
    this.autor = consulta.data;
    consulta = await Controlador.get("post/comentarios", {
      params: {
        titulo: this.postEnviado.titulo,
        creador: this.postEnviado.creador
      }
    });
    this.comentarios = consulta.data;
  }

  darLike() {
    //this.botonLike=this.botonLike;
    console.log("me gusta");
  }

  comentar() {
    this.comentando = true;
  }

  async enviarComentario() {
    try {
      await Controlador.post("post/comentario", {
        post: this.postEnviado,
        comentario: this.comentario
      });
      let consulta = await Controlador.get("post/comentarios", {
        params: {
          titulo: this.postEnviado.titulo,
          creador: this.postEnviado.creador
        }
      });
      this.comentarios = consulta.data;
      this.comentario = "";
      this.comentando = false;
    } catch (e) {
      console.log(e);
    }
  }

  cancelarComentario() {
    this.comentario = "";
    this.comentando = false;
  }
}

</script>

<style scoped>
.titulo {
  font-size: medium;
}
</style>
