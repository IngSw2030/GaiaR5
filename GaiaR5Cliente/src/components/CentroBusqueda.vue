<template>
  <q-page style="background-color: #fdebc7">
  <div>
    <div>
      <br>
      <q-input filled bottom-slots v-model="text" label="Centro de acopio" label-color="light-green-9" bg-color="#FAEBC3" :dense="dense">
        <template v-slot:before>
          <q-btn flat unelevated icon="arrow_back" color="secondary"/>
        </template>

        <template v-slot:append>
          <q-icon name="search" color="secondary"/>
        </template>

        <template v-slot:hint>
          <q-btn flat style="color: #7FA949" label="tag" unelevated icon="storage" />
        </template>
      </q-input>
    </div>
    <br>
    <div>
      <template>
        <q-list>
          <div class="q-pa-md" style="max-width: 450px">
            <div class="text-secondary" style="font-size: 20px">
              <q-item-label header style="color: #7FA949">RECIENTES</q-item-label>
            </div>
            <q-item-section>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Asociación de recicladores buenos aires Gladys</q-item-label>
                  <q-item-label caption>
                    Horario: 8:00 am a 5:00 pm
                  </q-item-label>
                  <q-item-label caption>
                    Hace tres semanas
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced inset />
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Asociación de recicladores de oficio nueva visión</q-item-label>
                  <q-item-label caption>
                    Horario: 8:00 am a 5:00 pm
                  </q-item-label>
                  <q-item-label caption>
                    Hace un mes
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-item-section>
          </div>
        </q-list>
      </template>
    </div>
  </div>
  </q-page>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
 export default class CentroBusqueda extends Vue {
}
</script>

<style scoped>

</style>
