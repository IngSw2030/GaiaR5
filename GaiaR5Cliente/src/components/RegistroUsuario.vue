<template xmlns:a="http://www.w3.org/1999/html">
  <q-page padding style="background-color: #fdebc7">
    <q-item to="/login" active clickable v-ripple fixed-right>
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 5ex"/>
      </q-item-section>
    </q-item>
    <div align="center" style="color:darkgreen; font-size: 19px; font-weight: bold">
      Haz parte de la comunidad R5
    </div>
    <a href=''
       style="cursor-pointer:hand;display: flex;flex-direction: column;align-content: center;align-items: center;color:#7FA949;justify-content: center;color:#7FA949">
      <q-img
        width="110px"
        height="110px"
        src="https://i.ibb.co/ggbP1bT/2.png"
      />
      <!--<q-uploader
        style="width: 50px;height: 50px ; background-color: #7FA949"
        url="http://localhost:4444/upload"
        accept=".jpg, image/*"
        @rejected="onRejected"
      /> -->
      <p align="center" style="color:#7FA949; font-size:12px;margin-bottom: 1.5px">
        <q-icon name="add_photo_alternate" style="color: #7FA949;"/>
        Agregar Avatar
      </p>
    </a>
    <div align="center"
         style="display: flex;flex-direction: column;align-content: center;align-items: center;justify-content: center">
      <q-input color=green v-model="nombre" label="Nombre de Usuario" :dense="dense" style="width: 300px"
               label-color="#807979">
        <template v-slot:prepend>
          <q-icon name="person" style="color: #7FA949"/>
        </template>
      </q-input>
      <q-input color=green v-model="email" label="Email" :dense="dense" style="width: 300px" label-color="#807979">
        <template v-slot:prepend>
          <q-icon name="mail" style="color: #7FA949"/>
        </template>
      </q-input>


      <q-input color=green v-model="cedula" label="Número de Cédula" :dense="dense" style="width: 300px"
               label-color="#807979">
        <template v-slot:prepend>
          <q-icon name="contacts" style="color: #7FA949"/>
        </template>
      </q-input>

      <q-input v-model="password" :type="isPwd1 ? 'password' : 'text'" color="green"
               label="Contraseña" style="width:300px;position: center">
        <template v-slot:prepend>
          <q-icon name="lock" style="color: #7FA949;"/>
        </template>
        <q-icon style="color: #7FA949; margin-top: 15px"
                :name="isPwd1 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd1 = !isPwd1"
                size="25px"
        />
      </q-input>

      <q-input v-model="password2" :type="isPwd2 ? 'password' : 'text'" color="green"
               label="Confirmar Contraseña" style="width:300px;position: center">
        <template v-slot:prepend>
          <q-icon name="no_encryption" style="color: #7FA949"/>
        </template>
        <q-icon style="color: #7FA949; margin-top: 15px"
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
                size="25px"
        />
      </q-input>
    </div>
    <div align="center">
      <q-btn push color="light-green" label="Registrarme" align="center" @click="registrarse"
             style=" font-size: 12px; width: auto; margin-top: 20px"/>
    </div>

    <div align="center"
         style="display: flex;flex-direction: row;justify-content:center;align-content: center;margin-top: 25px">
      <p align="center" style=" font-size: 15px; font-weight: bold ;margin-right: 10px; color:#807979">
        Ya soy Eco...
      </p>
      <a style="text-decoration: underline;font-weight: bold;cursor-pointer:hand;color:#7FA949" href='/#/login'>
        Iniciar Sesión </a>
    </div>


  </q-page>
</template>
<style scoped>
p.centrar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
</style>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Controlador from "../api/Controlador";
import {Usuario} from "../../../entidades";

@Component({
  name: "RegistrarUsuario"
})
export default class RegistroPerfilUsuario extends Vue {
  password2: string = "";
  password: string = "";
  isPwd1: boolean = true;
  isPwd2: boolean = true;
  email: string = "";
  nombre: string = "";
  cedula: string = "";
  user : Usuario | undefined;

  async registrarse() {
    await Controlador.iniciarSesion("1013632535", "holamundo");
    if (this.password === this.password2 && this.password != "") {
      this.user= await Controlador.post("usuario", {
          nombre: this.nombre,
          cedula: this.cedula,
          email: this.email,
          pass: this.password
        }
        , undefined);
      let viajes = await Controlador.get("usuario/viajes", {
        params: {
          limite: 5
        }
      });
      console.log(viajes);
    } else {
      this.$q.notify("Las contraseñas no coinciden")
    }
    if (this.user != null){
      this.$router.push("/");
    }
    else{
      this.$q.notify("Registro invalido")
    }

  }
}


</script>
