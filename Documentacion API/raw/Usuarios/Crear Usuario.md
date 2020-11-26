# Recurso expuesto para crear usuarios en el sistema.
## Parámetros en el body JSON

> **nombre \<string>** Nombre del nuevo usuario que será usado por el sistema para personalización.
> 
> **cedula \<string>** Identificación del usuario.
> 
> **email \<string>** Correo electrónico del usuario.
>
> **pass \<string>** Contraseña del usuario.
---------
## Respuesta como texto
### Correcta
Una petición correcta al recurso da como resultado el usuario creado en el sistema con el campo de contraseña eliminado por seguridad.
### Errónea
Una petición errónea indicara el error.