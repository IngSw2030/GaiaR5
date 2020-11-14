<template xmlns:a="http://www.w3.org/1999/html">
  <q-page padding style="background-color: #fdebc7" >
    <div to="/" active clickable v-ripple fixed-right style="display: flex;flex-direction: row;align-items:center;justify-content:start; align-content: center;">
      <q-icon name="keyboard_backspace" style="color: #7FA949; font-size: 5ex" />
      <p style="color:#7FA949;"> UsuarioEco</p>
    </div>

    <div  style="display: flex;flex-direction: column;align-content: center;align-items: center;justify-content: center;margin-top: 20px;color:#7FA949;background-color:#">
      <q-img
        width="80px"
        height="80px"
        src="https://i.ibb.co/ggbP1bT/2.png"
      />
      <div style="cursor-pointer:hand;display: flex;flex-direction: column;align-content: center;align-items: center;justify-content: center;margin-top: 10px;color:darkgreen;margin-bottom: 0px">

        <p style="margin-bottom: 0px">EcoName</p>
        <p style="margin-top: 0px;margin-bottom:0px">Ecouser@gaiar5.eco</p>
        <p style="margin-top: 0px;margin-bottom: 0px">Rango Eco</p>

        <div align="center" style="margin-bottom: 0px;display:flex;flex-direction:row;align-content: center;align-items: center;justify-content: center;color:darkgreen">
          <p style="font-size: 12px;margin-bottom: 0px">20 Seguidores</p>
            <p align="center" style="color:darkgreen; font-size:12px;margin-top: 0px; margin-left: 7px;margin-bottom: 0px" >
              35 Seguidos
            </p>
        </div>
        <div align="center">
          <q-btn  style="width:auto;font-size: 10px;border-radius: 7px;border-style: solid" id="btn_seguir">Seguir
            <q-icon name="add" style="font-size: 10px; color:#7FA949"></q-icon>
          </q-btn>
          <q-btn style="margin-left: 5px;width:auto;font-size: 10px;border-radius: 7px;border-style: solid" id="btn_chat">
            Chat <q-icon name="chat" style="font-size: 10px; color: #7FA949"></q-icon>

          </q-btn>
        </div>
      </div>
      <div style="border-style:solid;width: 200px;border-radius: 2px;border-width: 1px;margin-top:0px"> </div>
      <p style="text-align:start;font-size: 12px;color: #7FA949;font-weight: bold">Posts</p>
    </div>



  </q-page>
</template>
<script lang="ts">

</script>
<style scoped>
p.btn-seguir {
  color: #7FA949;
  font-family: "Helvetica";
  font-size: 10pt;
  background-color: #7FA949;
  border: 1px solid;
  border-color: #7FA949;
  border-radius: 3px;
  width: 85px;
  height: 30px;
  position: absolute;
  top: 50px;
  left: 50px;
  cursor: hand;
}
p.centrar{
  display: flex;
  flex-direction: row;
  justify-content:center;
  align-content: center;
}
</style>

