# Recurso expuesto para buscar los tags mas populares.
## Parámetros en el query

> **top\<number>** Limite para devolver los tags mas populares.
---------
## Respuesta como JSON
### Correcta
Una petición correcta al recurso da como resultado una lista de tags que satisfacen la búsqueda.
> **tag\<string>** Nombre del tag.
> 
> **c\<number>** Cantidad de apariciones en los posts del sistema.
### Errónea
Una petición errónea indicara el error.