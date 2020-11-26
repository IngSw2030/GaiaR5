# Recurso expuesto para reportar un post.
## Parámetros en el body JSON

> **post\<Post>** Post que se quiere comentar.
>
> **reporte\<string>** Razón por la que esta reportando el post.
---------
## Respuesta como JSON
### Correcta
Una petición correcta al recurso da como resultado información acerca del reporte.
### Errónea
Una petición errónea indicara código 403 si el usuario no ha iniciado sesión antes.