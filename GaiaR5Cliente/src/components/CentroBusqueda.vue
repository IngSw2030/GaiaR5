<template>
  <q-page style="background-color: #fdebc7 ">
    <div class="q-gutter-md row items-start">
      <q-input v-model="texto" color="verde" label="Buscar" label-color="light-green-9" @click="buscar" style="width: 400px">
        <template v-slot:append>
          <q-icon name="search" color="light-green-9" style="background-color: #fdebc7" >
          </q-icon>
        </template>
        <template v-slot:after>
          <q-select borderless
                    color="light-green-9"
                    v-model="modelMultiple"
                    multiple
                    :options="tagsMaterial" bg-color="#fdebc7"
                    label-color="light-green-9"
                    style="min-width: 50px; max-width: 200px; color: #7FA949 ">
            <template v-slot:append>
              <q-icon name="local_offer" color="light-green-9" />
            </template>
          </q-select>
        </template>
      </q-input>
    </div>
    <div>
      <br>
    <p style="color: #7FA949; font-size: 18px" align="center">Centros de acopio</p>
    </div>
    <div style="color: #fdebc7; background-color: #fdebc7">
      <q-card class ="row"
              flat
              borderless
              style="background: #fdebc7"
              v-for="centro in listaCentroCA">
        <q-card-section class="col" >
          <q-btn v-html="centro.nombre" style="color: black; font-size: 15px; width:300px; height: 50px" align="left" @click="seleccionarCentro(centro)" clickable v-ripple >
          </q-btn>
          <q-separator />
        </q-card-section>

      </q-card>
    </div>
  </q-page>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Vue, Component } from 'vue-property-decorator';
import CentroAcopioBusqueda from "components/CentroAcopioBusqueda.vue";
import CentroAcopio from "../api/clases/CentroAcopioBusqueda";


@Component({
  components: { CentroAcopioBusqueda }
})

export default class CentroBusqueda extends Vue {


  data() {
    return {
      model: null,
      multiple: null,
    }
  }

  centrosAcopio=[]
  modelMultiple=[]

  centros: CentroAcopio[] =[
    new CentroAcopio("Asociacion de recuperados ambientales",
      "Cll 68 A # 70 - 13", ["Plastico", "Madera"], "8:00 am a 5:00 pm", false),

    new CentroAcopio(
      "Las manzanas" ,
      "Cll 80 A # 70 - 20",
      ["Plastico"],
      "8:00 am a 5:00 pm",
      false
    ),
    new CentroAcopio(
      "Los hermanos de javier",
      "Calle 45 #7-30",
      ["Papel", "Vidrio"],
      "9:00 am a 10:00 pm",
      false
    ),
    new CentroAcopio(
      "El codito",
      "Calle 13 #30-20",
      ["Plastico", "Madera", "Vidrio", "Carton"],
      "8:00 am a 5:00 pm",
      true
    ),
    new CentroAcopio(
      "Las tortugas",
      "Calle 69 #4-20",
      ["Aluminio"],
      "10:00 pm a 8:00 am",
      false
    ),
    new CentroAcopio(
      "Las almendras",
      "Calle 69 #4-20",
      ["Aluminio", "Madera"],
      "10:00 pm a 8:00 am",
      false
    ),
    new CentroAcopio(
      "Las peras",
      "Calle 69 #4-20",
      ["Plastico"],
      "10:00 pm a 8:00 am",
      false
    )]
  centrofiltrado:CentroAcopio[] =[];
  texto:string ="";

  filtro(){
    return this.texto
  }

  buscar() {
    this.centros.forEach((centro)=>{
      if(centro.nombre.indexOf(this.texto) !== -1){
        this.centrofiltrado.push(centro);
      }
    })
  }

  get listaCentroCA(){
    return this.$store.state.store_CA.centrosCA
  }

  get tagsMaterial(){
    return this.$store.state.store_CA.tags
  }

  get listacentrobus(){
    return this.$store.state.store_CA.centrobus
  }

  setCentroElegido(val){
    this.$store.commit('store_CA/updateCentroElegido', val)
  }

  seleccionarCentro(centro){
    this.setCentroElegido(centro)
    this.$router.push('/info')
  }


  filtrar(){
    this.listaCentroCA.then((res=>{
      console.log(res);
      this.centrosAcopio = res.data;
    }))
  }

}

</script>
<style scoped>

</style>
