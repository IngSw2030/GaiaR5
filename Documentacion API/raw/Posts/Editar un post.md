# Recurso expuesto para editar post del usuario en el sistema.
## Parámetros en el body JSON

> **postActual\<Post>** Post actual que sera modificado.
>
> **postNuevo\<Post>** Post con las modificaciones a ser realizadas.
---------
## Respuesta como JSON
### Correcta
Una petición correcta al recurso da como resultado un código 200.
### Errónea
Una petición errónea indicara código 403 si el usuario no ha iniciado sesión antes.