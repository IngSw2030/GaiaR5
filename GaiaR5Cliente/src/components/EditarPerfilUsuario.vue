<template xmlns:a="http://www.w3.org/1999/html">
  <q-page padding style="background-color: #fdebc7" >
    <q-item to="/" active clickable v-ripple fixed-right >
      <q-item-section avatar>
        <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 5ex" />
      </q-item-section>
    </q-item>
    <div align="center" style="color:darkgreen; font-size: 19px; font-weight: bold">
      ¿Puede ser tu perfil más Eco?
    </div>
    <a   href='' style="cursor-pointer:hand;display: flex;flex-direction: column;align-content: center;align-items: center;justify-content: center;margin-top: 20px;color:#7FA949">
      <q-img
        width="110px"
        height="110px"
        src="https://i.ibb.co/ggbP1bT/2.png"
      />
      <q-item  align="center" style="color:#7FA949; font-size:12px" >
        <q-icon name="add_photo_alternate" style="color: #7FA949;margin-top: 1.5px"  />
        Editar Avatar
      </q-item>
    </a>
    <div align="center" style="display: flex;flex-direction: column;align-content: center;align-items: center;justify-content: center" >
      <q-input color= green v-model="ph" label="Nombre de Usuario"   :dense="dense" style="width: 300px" label-color="#807979" disable >
        <template v-slot:prepend>
          <q-icon name="person" style="color: #7FA949" />
        </template>
      </q-input>
      <q-input color= green v-model="ph" label="Email"   :dense="dense" style="width: 300px" label-color="#807979" disable >
        <template v-slot:prepend>
          <q-icon name="mail" style="color: #7FA949" />
        </template>
      </q-input>


      <q-input color= green v-model="ph" label="Número de Cédula"   :dense="dense" style="width: 300px"label-color="#807979" disable>
        <template v-slot:prepend>
          <q-icon name="contacts" style="color: #7FA949" />
        </template>
      </q-input>
      <q-input v-model="password" :type="isPwd1 ? 'password' : 'text'" color="green"
               label="Contraseña"  style="width:300px;position: center">
        <template v-slot:prepend>
          <q-icon name="lock" style="color: #7FA949;" />
        </template>
        <q-icon style="color: #7FA949; margin-top: 15px"
                :name="isPwd1 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd1 = !isPwd1"
                size="25px"
        />
      </q-input>

      <q-input v-model="password2" :type="isPwd2 ? 'password' : 'text'" color="green"
               label="Confirmar Contraseña"  style="width:300px;position: center">
        <template v-slot:prepend>
          <q-icon name="no_encryption" style="color: #7FA949" />
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
      <q-btn push color="light-green" label="Guardar Cambios" align="center" style=" font-size:12px; width: auto; margin-top: 20px" />
    </div>

    <div align="center" style="display: flex;flex-direction: row;justify-content:center;align-content: center;margin-top: 15px" >
      <a style="text-decoration: underline;font-weight: bold;cursor-pointer:hand;color:#7FA949" href='/#/perfil'   >
        Cancelar </a>
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
import {Component, Vue} from 'vue-property-decorator';

@Component({
  name: "EditarPerfilUsuario"
})
export default class EditarPerfilUsuario extends Vue {
  password2: string = "";
  password: string = "";
  isPwd1: boolean = true;
  isPwd2: boolean = true;
  email: string = "";
}
</script>
