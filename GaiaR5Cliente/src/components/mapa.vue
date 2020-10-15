<template>

  <q-page>

    <GmapMap
      :center="{lat:4.629070, lng:-74.062716}"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 500px; height: 300px"
    >
      //<GmapMarker
        //:key="index"
        //v-for="(m, index) in markers"
        //:position="m.position"
        //:clickable="true"
        //:draggable="true"
        //@click="center=m.position"
      ///>

      <GmapMarker :position="{lat:  4.629070, lng: -74.062716}" />

    </GmapMap>

  </q-page>
</template>


<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyADfRbp9uevhD-MsNaoLKbvRWIKbZGPNWE'
  }
})

 export default {
}
</script>

<style >

</style>
