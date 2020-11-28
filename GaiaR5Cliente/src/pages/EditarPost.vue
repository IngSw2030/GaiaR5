<template>
  <q-page style="background-color: #fdebc7">
    <q-input v-model="titulo" label="Titulo"/>
    <div class="row">
      <q-input label="Tag" v-model="nuevoTag" dense>
        <template v-slot:after>
          <q-btn round dense flat icon="add" @click="addTag"/>
        </template>
      </q-input>
    </div>
    <div class="row">
      <q-chip v-for="(tag, indice) in tags" :key="`${tag}:${indice}`"removable @remove="quitarTag(indice)">
        <q-avatar color="green" icon="bookmark" text-color="white"/>
        {{ tag }}
      </q-chip>
    </div>
    <q-list>
      <q-item v-for="(itemContenido, indice) in contenido" :key="`${itemContenido.tipo}:${indice}`">
        <q-item-section>
          <contenido-cluster :elemento="itemContenido"/>
        </q-item-section>
      </q-item>
    </q-list>
    <q-select v-model="selector" :options="opciones" emit-value label="Tipo de contenido"/>
    <q-input v-model="dataSeleccion"/>
    <q-btn label="Añadir" @click="sumarSeleccion"/>
    <q-btn label="Crear Post" @click="crearPost"/>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Contenido, {TipoContenido} from "../../../entidades/Contenido";
import ContenidoCluster from "components/ContenidoCluster.vue";
import Post from "../../../entidades/Post";
import Controlador from "../api/Controlador";
import {Usuario} from "../../../entidades/index";

@Component({
  components: {ContenidoCluster}
})
export default class PageIndex extends Vue {
  public titulo: string = "";
  public tags: string[] = [];
  public nuevoTag: string = "";
  public contenido: Contenido[] = [];
  public selector: string = "";
  public opciones = [
    {label: "Parrafo", value: "PARRAFO"},
    {label: "Imagen", value: "IMAGEN"},
    {label: "Video", value: "VIDEO"}
  ];
  public dataSeleccion: string = "";
  get usuario():Usuario{
    return this.$store.state.store_user.usuario;
  }

  public sumarSeleccion() {
    console.log(this.selector);
    switch (this.selector) {
      case "PARRAFO":
        this.contenido.push(new Contenido(TipoContenido.PARRAFO, this.dataSeleccion, ""));
        break;
      case "IMAGEN":
        this.contenido.push(new Contenido(TipoContenido.IMAGEN, "", this.dataSeleccion));
        break;
      case "VIDEO":
        this.contenido.push(new Contenido(TipoContenido.VIDEO, "", this.dataSeleccion));
        break;
    }
    this.selector = "";
    this.dataSeleccion = "";
  }

  public addTag(){
    this.$set(this.tags, this.tags.length, this.nuevoTag);
    this.nuevoTag = "";
  }

  public quitarTag(indice: number){
    this.$delete(this.tags, indice);
  }

  public async crearPost(){
    try{
      let post = new Post(this.usuario.cedula, Date.now(), this.titulo, this.tags);
      post.contenido = this.contenido;
      await Controlador.post("post", post);
      this.$q.notify("Post creado correctamente");
    }catch (e){
      console.log(e);
    }
  }
};
</script>
<style>

</style>
