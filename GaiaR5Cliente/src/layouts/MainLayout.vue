<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: #7FA949" >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          GaiaR5
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="300"
      :breakpoint="400"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd; background-color: #fdebc7">
        <q-list padding  >
          <q-item clickable v-ripple  >
            <q-item-section avatar>
              <q-icon name="home"  style="color: #7FA949;" />
            </q-item-section>

            <q-item-section class="text-dark">
              Home
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;" />
            </q-item-section>

          </q-item>

          <q-item to="/semillas" active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="assessment" style="color: #7FA949;" />
            </q-item-section>

            <q-item-section  class="text-dark">
              Semillas
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;" />
            </q-item-section>

          </q-item>

          <q-item clickable v-ripple bg-grey-3>
            <q-item-section avatar>
              <q-icon name="account_box"  style="color: #7FA949;" />
            </q-item-section>

            <q-item-section class="text-dark">
              Eco usuarios
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;" />
            </q-item-section>

          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="favorite" style="color: #7FA949;" />
            </q-item-section>

            <q-item-section class="text-dark">
              Post
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;" />
            </q-item-section>

          </q-item>


          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="shopping_basket" style="color: #7FA949;" />
            </q-item-section>

            <q-item-section class="text-dark">
              Tienda
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;" />
            </q-item-section>

          </q-item>

          <q-item to="/centrobusqueda" active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="location_on" style="color: #7FA949;" />
            </q-item-section>

            <q-item-section class="text-dark">
              Centros de Acopio
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;" />
            </q-item-section>

          </q-item>



          <q-item active clickable v-ripple >
            <q-item-section avatar >
              <q-icon name="settings" style="color: #7FA949;" />
            </q-item-section>

            <q-item-section class="text-dark">
              Configuración
            </q-item-section>

            <q-item-section avatar>
              <q-icon name="keyboard_arrow_right" style="color: #336eb9;" />
            </q-item-section>

          </q-item>


        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" style= " height: 150px; background-color: #fdebc7">
        <div class="absolute-bottom" style= "background-color: #fdebc7">

          <div
            class="relative-position container   flex flex-center">
            <q-avatar square size="56px" class="fixed-center-right">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </div>

          <q-item-section>
            <div class="text-weight-bolder" style="color: #7FA949;">
              <div class="text-center">ECO USUARIO </div>
            </div>
          </q-item-section>

          <div class="text-center" style="color: #336eb9;" >  ecouser@Gaiar5.com</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: { EssentialLink }
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  essentialLinks = linksData;
}
</script>
