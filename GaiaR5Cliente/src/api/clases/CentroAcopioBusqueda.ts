export default class CentroAcopioBusqueda{
  nombre: string;
  direccion: string;
  tags: string[];
  horario: string;
  avatar: string;
  latitud: number;
  longitud: number;

  constructor(nombre: string, direccion: string, tags: string[], horario: string, avatar: string, latitud:number, longitud:number) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.tags = tags;
    this.horario = horario;
    this.avatar = avatar;
    this.latitud = latitud;
    this.longitud = longitud;
  }
}
