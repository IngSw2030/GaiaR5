export default class CentroAcopioBusqueda{
  nombre: String;
  direccion: String;
  tags: String[];
  horario: String;
  avatar: String;

  constructor(nombre: String, direccion: String, tags: String[], horario: String, avatar: String) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.tags = tags;
    this.horario = horario;
    this.avatar = avatar;
  }
}
