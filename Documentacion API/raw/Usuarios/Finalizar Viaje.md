# Recurso expuesto para finalizar el viaje mas reciente de un usuario a un centro de acopio.
## Parámetros en el body JSON

> **distancia \<number>** Distancia entre el punto inicial del usuario y el centro de acopio.
---------
## Respuesta como texto
### Correcta
Una petición correcta al recurso da como resultado la información del viaje y del centro de acopio visitado para su presentación al usuario.
> **visita \<object>** Información relevante a la visita como se entregó al inicio del viaje.
>
> **centro \<CentroAcopio>** Información del centro de acopio visitado.
### Errónea
Una petición errónea indicara el error.