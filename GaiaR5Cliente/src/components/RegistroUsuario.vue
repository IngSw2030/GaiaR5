<template xmlns:a="http://www.w3.org/1999/html">
  <q-page padding style="background-color: #fdebc7" >
    <q-item to="/login" active clickable v-ripple fixed-right >
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 5ex" />
      </q-item-section>
    </q-item>
    <div align="center" style="color:darkgreen; font-size: 19px; font-weight: bold">
      Haz parte de la comunidad R5
    </div>
    <a href='' style="cursor-pointer:hand;display: flex;flex-direction: column;align-content: center;align-items: center;color:#7FA949;justify-content: center;color:#7FA949">
      <q-img
        width="110px"
        height="110px"
        src="https://i.ibb.co/ggbP1bT/2.png"
      />
      <p align="center" style="color:#7FA949; font-size:12px;margin-bottom: 1.5px" >
        <q-icon name="add_photo_alternate" style="color: #7FA949;" />
        Agregar Avatar
      </p>
    </a>
    <div align="center" style="display: flex;flex-direction: column;align-content: center;align-items: center;justify-content: center" >
    <q-input color= green v-model="ph" label="Nombre de Usuario"   :dense="dense" style="width: 300px" label-color="#807979" >
      <template v-slot:prepend>
        <q-icon name="person" style="color: #7FA949" />
      </template>
    </q-input>
      <q-input color= green v-model="ph" label="Email"   :dense="dense" style="width: 300px" label-color="#807979" >
        <template v-slot:prepend>
          <q-icon name="mail" style="color: #7FA949" />
        </template>
      </q-input>


    <q-input color= green v-model="ph" label="Número de Cédula"   :dense="dense" style="width: 300px"label-color="#807979">
      <template v-slot:prepend>
        <q-icon name="contacts" style="color: #7FA949" />
      </template>
    </q-input>



    <q-input color= green v-model="ph" label="Número de Celular"   :dense="dense" style="width: 300px" label-color="#807979">
      <template v-slot:prepend>
        <q-icon name="call" style="color: #7FA949" />
      </template>
    </q-input>


    <q-input color= green v-model="ph" label="Contraseña"   :dense="dense" type="password" style="width: 300px" label-color="#807979" >
      <template v-slot:prepend>
        <q-icon name="lock" style="color: #7FA949" />
      </template>
    </q-input>

    <q-input color= green v-model="ph" label="Confirmar Contraseña"   :dense="dense" type="password" style="width: 300px;" label-color="#807979">
      <template v-slot:prepend>
        <q-icon name="no_encryption" style="color: #7FA949" />
      </template>
    </q-input>
    </div>
    <div align="center">
      <q-btn push color="light-green"label="Registrarme" align="center" style=" font-size: 12px; width: auto; margin-top: 20px" />
    </div>

    <div align="center" style="display: flex;flex-direction: row;justify-content:center;align-content: center;margin-top: 25px" >
      <p align="center" style=" font-size: 15px; font-weight: bold ;margin-right: 10px; color:#807979">
        Ya soy Eco...
      </p>
      <a style="text-decoration: underline;font-weight: bold;cursor-pointer:hand;color:#7FA949" href='/#/login'  >
        Iniciar Sesión </a>
    </div>



  </q-page>
</template>
<style scoped>
p.centrar{
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-content: center;
}
</style>
<script lang="ts">
export default {
  name: "Login",
  data () {
    return {
      password: '',
      isPwd: true,

      email: ''
    }
  }
}
</script>
