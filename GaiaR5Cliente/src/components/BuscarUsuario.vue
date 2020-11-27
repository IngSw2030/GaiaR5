<template>
  <q-page style="background-color: #fdebc7 ">
    <br>
    <div class="q-gutter-md row items-start">
      <q-input rounded outlined v-model="textoBusqueda" color="light-green-9" label="Buscar Usuario"
               label-color="light-green-10" style="width: 400px" @input="buscarPorNombre">
        <template v-slot:prepend>
          <q-icon color="light-green-9" name="search">
          </q-icon>
        </template>
        <template v-slot:before>
          <q-icon color="light-green-9" name="keyboard_backspace">
          </q-icon>
        </template>
        <template v-slot:append>
          <q-btn flat label="cédula" color="light-green-9" @click="buscarPorID" >
          </q-btn>
        </template>
        <template v-slot:after>
          <q-icon name="close" @click="textoBusqueda = ''" class="cursor-pointer" />
        </template>
      </q-input>

    </div>
    <br>
    <div style="color: #fdebc7; background-color: #fdebc7">
      <q-chip class="row"
              style="background: #fdebc7"
              v-for="(usuario, index) in usuarios"
              :key="`${usuario.nombre}:${index}`"
      >
        <q-item clickable v-ripple>
          <q-item-section side>
            <q-avatar rounded size="32px">
              <img :src="usuario.avatar"/>
            </q-avatar>
          </q-item-section>
<<<<<<< HEAD
          <q-item-section @click="">
=======
          <q-item-section @click="seleccionarUsuario(usuario.cedula)">
>>>>>>> a4500a090d34a9495732425b764095de6af9cea0
            <q-item-label caption blond v-html=usuario.nombre
                          style="color: #7FA949; font-size: 15px; width:300px"></q-item-label>
          </q-item-section>
          <br><br>
        </q-item>
        <br>
      </q-chip>
      <br>
    </div>
  </q-page>
</template>


<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import VisitarPerfil from "components/./VisitarPerfil.vue";
import Controlador from "../api/Controlador";

const {StringUtils} = require('turbocommons-ts');
import {Usuario} from "../../../entidades"

@Component({
  components: {VisitarPerfil}
})

export default class BuscarUsuario extends Vue {

  textoBusqueda: string = "";
  usuarios: Usuario[] = [];

  async buscarPorNombre() {
    try {
      let resultado: any = await Controlador.get("usuario", {
        params: {
          nombre: this.textoBusqueda
        }
      });
      let usuariosJs = resultado.data;
      this.usuarios = [];
      for (let usuariofor of usuariosJs){
      let usuario = Usuario.hidratar(usuariofor);
      this.usuarios.push(usuario);
      console.log(this.usuarios);
      }
    }
    catch (e) {
      this.$q.notify(`Ocurrio un error: ${e.message}`);
    }
  }
  async buscarPorID() {
    try {
      let resultado: any = await Controlador.get("usuario", {
        params: {
          cedula: this.textoBusqueda
        }
      });
      let usuarioJs = resultado.data;
      this.usuarios = [];
      let usuario = new Usuario(usuarioJs.nombre, usuarioJs.cedula, usuarioJs.email, usuarioJs.pass);
      this.usuarios.push(usuario);
      console.log(this.usuarios);
    } catch (e) {
      this.$q.notify(`Ocurrio un error: ${e.message}`);
    }

  }

  seleccionarUsuario (cedula: string){
    this.$router.push(`/testPerfilUsuario/${cedula}`);
  }

}
</script>

<style scoped>
</style>
