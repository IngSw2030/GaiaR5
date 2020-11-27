# Recurso expuesto para buscar usuarios por criterios como cedula o nombre.
## Parámetros en el query

> **cedula\<string> (opcional | XOR)** Identificación del usuario.
> 
> **nombre\<string> (opcional | XOR)** Nombre del usuario.

Se debe escoger el criterio ya que son excluyentes.
---------
## Respuesta como JSON
### Correcta
#### Nombre
Una petición correcta al recurso da como resultado una lista de usuarios que satisfacen la búsqueda.
#### Cedula
Una petición correcta al recurso da como resultado el usuario correspondiente a la cedula.

### Errónea
Una petición errónea indicara el error.