<template>
  <q-page padding  style="background-color: #fdebc7">
  <div>
    <q-expansion-item>
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar :icon="centro.avatar" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          {{centro.nombre}}
        </q-item-section>
        <q-item-section side>

        </q-item-section>
      </template>

      <q-card>
        <q-card-section>
          Tags:
          <div class="row items-center">
            <q-chip v-for="(tag, indice) in centro.recursos" :key="'tag-'+centro.nombre+indice">{{tag}}</q-chip>
          </div>
          <p>{{centro.direccion}}</p>
          <p>{{centro.horario}}</p>


          <q-item to="/info" active clickable v-ripple  style= "background-color: #336eb9" >
            <q-item-section avatar >
              <q-icon name="keyboard_arrow_right" style="color: #7FA949;" />
            </q-item-section>

            <q-item-section class="text-dark">
              Ir
            </q-item-section>

          </q-item>


        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import CentroAcopio from "src/api/clases/CentroAcopioBusqueda";

@Component
export default class CentroAcopioBusqueda extends Vue {
  @Prop() centro:CentroAcopio;

  computed(){

}

}
</script>
