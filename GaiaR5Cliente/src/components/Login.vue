<template>
  <q-page padding  style="background-color: #fdebc7">
    <div align="center">
      <br>
      <q-img
        width="110px"
        height="110px"
        src="https://i.ibb.co/ggbP1bT/2.png"
      />
    </div>
    <div align="center" style="color: #1D1D1D; font-size: 19px; font-weight: bold">
      Sigue siendo Eco...
    </div>
    <br>
    <div align="center" >
      <q-input v-model="nickname" label="Nombre de usuario o Email"  label-color="light-green-9" color="light-green-9"  style="width: 300px"/>
      <br>
      <q-input  v-model="password" :type="isPwd ? 'password' : 'text'" label="Contraseña" label-color="light-green-9" color="light-green-9" style="width:300px;position: center">
        <template v-slot:append>
          <q-icon style="color: #7FA949"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <br>
    </div>
      <div align="center">
        <q-btn push color="light-green-9" label="Iniciar Sesión" align="center" style=" font-size: medium; width: 200px" />
      </div>
      <br>
      <div align="center" style="color: #1D1D1D; font-size: 19px; font-weight: bold">
        O
      </div>
      <div class="q-pa-md q-gutter-sm " align="center">
        <q-btn
          label="Continua con Facebook"
          color="blue-9"
          icon="facebook"
          style="width: 250px"
        >
        </q-btn>
        <q-btn
          label="Continua con Google "
          color="white"
          text-color="black"
          icon="g_translate"
          style="width: 250px"
        >
        </q-btn>
        <br><br>
      </div>
    <div align="center" style="color: #7FA949; font-size: 19px; font-weight: bold">
      ¿Quieres hacer parte de la comunidad R5?
    </div>
    <div align="center">
      <q-btn flat label="Registrarme" text-color="light-green-9" style="font-size: large"></q-btn>
    </div>
  </q-page>
</template>

<script>

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

<style scoped>

</style>

