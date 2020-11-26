<template>
  <q-page padding style="background-color: #fdebc7">
    <div align="center">
      <br>
      <q-img
        height="110px"
        src="https://i.ibb.co/ggbP1bT/2.png"
        width="110px"
      />
    </div>
    <div align="center" style="color: darkgreen; font-size: 19px; font-weight: bold">
      Sigue siendo Eco...
    </div>
    <br>
    <br>
    <div align="center">
      <q-input v-model="cedula" color="light-green-9" filled label="Cédula"
               label-color="light-green-9" style="width: 300px">
        <template v-slot:append>
          <q-icon name="account_circle" style="color: #7FA949"></q-icon>
        </template>
      </q-input>
      <br>
      <q-input v-model="password" :type="isPwd ? 'password' : 'text'" color="light-green-9" filled
               label="Contraseña" label-color="light-green-9" style="width:300px;position: center">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  style="color: #7FA949"
                  @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <br>
    </div>
      <div align="center">
        <q-btn push color="light-green-9" label="Iniciar Sesión" align="center" style=" font-size: medium; width: 200px" @click="login" />
      </div>
      <br>
      <div align="center">
        <template >
          <q-btn flat label="¿Olvidaste tu contraseña?" size="12px" color="light-green-9" style=""></q-btn>
        </template>
      </div>
    <br>
    <div align="center">
      <q-btn flat label="Registrarme" to="/registroUsuario" text-color="light-green-9" style="font-size: large"></q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Controlador from "../api/Controlador";

@Component({
  name: "Login"
})
export default class Login extends Vue {
  password: string = "";
  isPwd: boolean = true;
  email: string = "";
  cedula: string ="";

   login() {
    console.log(Controlador.iniciarSesion(this.cedula, this.password));
  }

  get autentificado(){
    return this.$store.state.store_user.autentificacion
  }

  setAutentificado(){
    this.$store.commit('store_user/toggleAutentificado')
  }

}
</script>

<style scoped>

</style>

