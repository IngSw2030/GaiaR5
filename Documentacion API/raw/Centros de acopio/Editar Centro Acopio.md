# Recurso expuesto para crear editar centros de acopio, solo accesible para administradores.
## Parámetros en el body JSON

> **centroActual \<CentroAcopio>** Centro de acopio que se quiere actualizar.
> 
> **centroNuevo \<CentroAcopio>** Centro de acopio con las actualizaciones requeridas.
---------
## Respuesta como JSON
### Correcta
Una petición correcta al recurso da como resultado un código 200.
### Errónea
Una petición errónea indicara el código 403 en caso de que el usuario no haya iniciado sesión o no tenga permisos suficientes.