<template>
  <q-page padding  style="background-color: #fdebc7">
  <div>
    <div class="q-pa-md">
      <q-item-label style="color: #7FA949; font-size: 20px">
        <q-btn flat icon="keyboard_backspace" color="light-green-9" size="20px"></q-btn>
          Chats
      </q-item-label>

      <q-list class="rounded-borders" >
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Brunch this weekend?</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">Janet</span>
              -- I'll be in your neighborhood doing errands this
              weekend. Do you want to grab brunch?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            1 min ago
          </q-item-section>
        </q-item>

        <q-separator inset="item" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    </div>
  </q-page>
</template>

<script>
export default {
name: "Historial"
}
</script>

<style scoped>

</style>
