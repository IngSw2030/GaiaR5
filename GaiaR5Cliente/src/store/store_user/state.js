import CentroAcopio from "src/api/clases/CentroAcopioBusqueda";
import {Usuario} from "../../../../entidades"

export default function () {
  return {
    //variables de prueba
    autentificado: false,

    user: Usuario= new Usuario(
      "Lincoln Osan",
      "1018499372",
      0
    )


  }
}
