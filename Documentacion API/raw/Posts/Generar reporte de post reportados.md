# Recurso expuesto para obtener la lista de post reportados que aun no han sido solucionados.
---------
## Respuesta como JSON
### Correcta
Una petición correcta al recurso da como resultado una lista de elementos que contienen el post reportado como el reporte hecho por el usuario que reporta.
### Errónea
Una petición errónea indicara código 403 si el usuario no ha iniciado sesión antes o no tiene permisos de moderador.