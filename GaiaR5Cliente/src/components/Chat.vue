<template>
  <q-page style="background-color: #fdebc7">
    <div class="q-pa-md">
      <q-btn round flat icon="keyboard_backspace" color="light-green-9"></q-btn>
        <q-avatar>
        <q-img src="https://cdn.quasar.dev/img/avatar3.jpg" sizes="20px"/>
        </q-avatar>
        <template>
        Jane
      </template>
    </div>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          name="me"
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          :text="['hey, how are you?']"
          sent
          stamp="7 minutes ago"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="['doing fine, how r you?']"
          stamp="4 minutes ago"
        />
        <div class=fixed-bottom>
        <q-input rounded filled color="light-green-9"></q-input>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
name: "Chat"
}
</script>

<style scoped>

</style>
