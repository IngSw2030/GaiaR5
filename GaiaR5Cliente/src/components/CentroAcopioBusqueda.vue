<template>
  <q-expansion-item class="full-width">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="control_camera" color="light-green-9" text-color="white"/>
      </q-item-section>
      <q-item-section>
        {{ centro.nombre }}
      </q-item-section>
      <q-item-section side>
      </q-item-section>
    </template>
    <q-card>
      <q-card-section>
        Tags:
        <div class="row items-center">
          <q-chip v-for="(tag, indice) in centro.recursos" :key="'tag-'+centro.nombre+indice">{{ tag }}</q-chip>
        </div>
        <p>{{ centro.direccion }}</p>
        <p>{{ centro.horario }}</p>
        <q-item v-ripple active clickable style="background-color: #336eb9" to="/info">
          <q-item-section avatar>
            <q-icon name="keyboard_arrow_right" style="color: #7FA949;"/>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import CentroAcopio from "src/api/clases/CentroAcopioBusqueda";

@Component
export default class CentroAcopioBusqueda extends Vue {
  @Prop() centro!: CentroAcopio;
  computed() {
  }
}
</script>
