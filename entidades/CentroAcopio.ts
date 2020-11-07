export default class CentroAcopio {
    public nombre: String;
    public direccion: String;
    public numero: String;
    public latitud: number;
    public longitud: number;
    public pagina: String;
    //Hora de inicio en formato militar ej: 1500 = 3:00 pm
    public horarioApertura: number;
    public horarioCierre: number;
    public recursos: string[];

    constructor(nombre: String, direccion: String, numero: String, latitud: number, longitud: number, pagina: String, horarioApertura: number, horarioCierre: number, recursos: string[]) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.numero = numero;
        this.latitud = latitud;
        this.longitud = longitud;
        this.pagina = pagina;
        this.horarioApertura = horarioApertura;
        this.horarioCierre = horarioCierre;
        this.recursos = recursos;
    }
}