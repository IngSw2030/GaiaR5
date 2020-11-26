# Recurso expuesto para crear post del usuario en el sistema.
## Parámetros en el body JSON

> **creador\<string>** Identificación del usuario creador del post.
>
> **publicacion\<number>** Tiempo POSIX de la publicación del post.
>
> **titulo\<string>** Titulo del post.
>
> **tags\<Array\<string>>** Tags con los que se marcará el post para su búsqueda.
>
> **contenido\<Array\<Contenido>>** Arreglo de contenido que compone el post.
---------
## Respuesta como JSON
### Correcta
Una petición correcta al recurso da como resultado un código 200.
### Errónea
Una petición errónea indicara código 403 si el usuario no ha iniciado sesión antes.