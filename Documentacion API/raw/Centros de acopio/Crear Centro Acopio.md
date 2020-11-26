# Recurso expuesto para crear centros de acopio en el sistema.
## Parámetros en el body JSON

> **nombre \<string>** Nombre del centro de acopio.
> 
> **direccion \<string>** Dirección del centro de acopio.
> 
> **numero \<string>** Numero del centro de acopio.
>
> **latitud \<number>** Latitud GPS del centro de acopio.
> 
> **longitud \<number>** Longitud GPS del centro de acopio.
> 
> **pagina \<string>** Pagina Web del centro de acopio, puede estar vacío.
> 
> **horarioApertura \<string>** Hora, en formato militar, en que el centro de acopio abre.
> 
> **horarioCierre \<string>** Hora, en formato militar, en que el centro de acopio cierra.
>
> **recursos \<string>** Arreglo de recursos que el centro de acopio puede procesar.
---------
## Respuesta como JSON
### Correcta
Una petición correcta al recurso da como resultado el centro de acopio creado.
### Errónea
Una petición errónea indicara el error.