export default class CentroAcopioBusqueda{
  nombre: String;
  direccion: String;
  tags: String[];
  horario: String;
  avatar: String;
  latitud: number;
  longitud: number;

  constructor(nombre: String, direccion: String, tags: String[], horario: String, avatar: String, latitud:number, longitud:number) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.tags = tags;
    this.horario = horario;
    this.avatar = avatar;
    this.latitud = latitud;
    this.longitud = longitud;
  }
}
