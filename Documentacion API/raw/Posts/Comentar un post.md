# Recurso expuesto para agregar un comentario a un post.
## Parámetros en el body JSON

> **post\<Post>** Post que se quiere comentar.
>
> **comentario\<string>** comentario a realizar en el post.
---------
## Respuesta como JSON
### Correcta
Una petición correcta al recurso da como resultado información acerca del comentario.
### Errónea
Una petición errónea indicara código 403 si el usuario no ha iniciado sesión antes.