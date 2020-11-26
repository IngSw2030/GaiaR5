# Recurso expuesto para iniciar viajes desde la ubicación del usuario hasta un centro de acopio.
## Parámetros en el body JSON

> **centro \<string>** Nombre del centro de acopio al que viajará el usuario.
---------
## Respuesta como texto
### Correcta
Una petición correcta al recurso da como resultado la información hasta el momento del viaje.
> **fecha \<number>** Fecha en formato de Tiempo Unix del inicio del viaje.
>
> **finalizada \<boolean>** Bandera que indica el estado del viaje, cuando se encuentra en \'True' el viaje ya fue finalizado.
>
> **semillas \<number>** Numero de semillas asignado al usuario por haber finalizado el viaje.
### Errónea
Una petición errónea indicara el error.