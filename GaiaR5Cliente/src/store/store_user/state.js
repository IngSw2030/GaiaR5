import CentroAcopio from "src/api/clases/CentroAcopioBusqueda";
import {Cookies} from "quasar";
export default function () {
  return {
    //variables de prueba
    autentificado: false,
    usuario: Cookies.get("usuario")
  }
}
