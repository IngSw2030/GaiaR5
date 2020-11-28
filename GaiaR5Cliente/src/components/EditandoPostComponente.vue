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

          <q-list>
            <q-item v-for="(itemContenido, indice) in contenido" :key="`${itemContenido.tipo}:${indice}`">
              <q-item-section>
                <contenido-cluster :elemento="itemContenido"/>
              </q-item-section>
              <q-btn
                class="q-mx-xs"
                size='xs'
                icon="cancel"
                @click="removeContenido(indice)"
              />
            </q-item>
          </q-list>
          <q-select v-model="selector" :options="opciones" label="Tipo de contenido" emit-value/>
          <q-input v-model="dataSeleccion"/>
          <q-btn label="Añadir" @click="sumarSeleccion"/>

      </q-card-section>

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
      <q-chip  style="background-color: #fbf5d8" v-for="(tag, index) in listaTags" icon="label" :label="tag"  text-color="light-green" :key="autor+tag" >
        <q-btn
          class="q-mx-xs"
          round
          size='xs'
          icon="cancel"
          @click="removeTag(index)"
        />
      </q-chip >
    </q-card-section>

    <q-btn color="primary" label="Primary" @click="crearPost" />
  </q-card>


</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {Post, Usuario} from "../../../entidades"
import Contenido, {TipoContenido} from "../../../entidades/Contenido";
import ContenidoCluster from "components/ContenidoCluster.vue";
import Controlador from "../api/Controlador";



@Component({
  components: {ContenidoCluster}
})
export default class PostComponente extends Vue  {

@Prop() postEnviado!: Post
  @Prop() mandatoCrearPost!: boolean

  tagEntrante: string="";
  tituloPost: string="";
  listaTags: string []= [
    "aluminio",
    "vidrio",
    "paz mundial"
  ]

  public contenido: Contenido[] = [];
  public selector: string = "";
  public opciones = [
    {label: "Parrafo", value: "PARRAFO"},
    {label: "Imagen", value: "IMAGEN"},
    {label: "Video", value: "VIDEO"}
  ];
  public dataSeleccion: string = "";



autor: Usuario=new Usuario(
  "Pepito perez",
  "1018499372",
  5000
)

  agregarTag(){
  if(this.tagEntrante!="")
   this.listaTags.push(this.tagEntrante)
  }


  beforeCreated() {
    this.listaTags=this.postEnviado.tags;
  }



  removeTag ( index: number ) {
      this.listaTags.splice( index, 1 );
  }

  removeContenido ( index: number ) {
    this.contenido.splice( index, 1 );
  }

  imprimir(){
    console.log(this.listaTags)
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
    console.log(this.contenido);
  }


  async crearPost() {
    try {
      let resultado:any = await Controlador.post("post", {
          creador:  "123456789",
          publicacion: Date.now(),
          titulo:this.tituloPost,
          tags:this.listaTags,
          contenido: this.contenido

      },  undefined);

      console.log(resultado)

    }catch (e){
      this.$q.notify(`Ocurrio un error: ${e.message}`);
    }
  }


}

</script>

<style scoped>

</style>
