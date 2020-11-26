# Recurso expuesto para iniciar sesión en el sistema.
## Parámetros en el body JSON

> **cedula \<string>** Identificación del usuario que intenta iniciar sesión en el sistema.
> 
> **pass \<string>** Contraseña del usuario.
---------
## Respuesta como texto
### Correcta
Una petición correcta al recurso da como resultado el token de acceso como texto plano para su uso en posteriores peticiones.
### Errónea
Una petición errónea indicara si el error proviene del servidor o por la falta de credenciales correctas.