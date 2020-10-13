export default class CentroAcopio{
    private _nombre:String;
    private _direccion: String;
    private _numero: String;
    private _latitud: number;
    private _longitud: number;
    private _pagina: String;
    //Hora de inicio en formato militar ej: 1500 = 3:00 pm
    private _horarioApertura: number;
    private _horarioCierre: number;

    constructor(nombre: String, direccion: String, numero: String, latitud: number, longitud: number, pagina: String, horarioApertura: number, horarioCierre: number) {
        this._nombre = nombre;
        this._direccion = direccion;
        this._numero = numero;
        this._latitud = latitud;
        this._longitud = longitud;
        this._pagina = pagina;
        this._horarioApertura = horarioApertura;
        this._horarioCierre = horarioCierre;
    }


    get nombre(): String {
        return this._nombre;
    }

    set nombre(value: String) {
        this._nombre = value;
    }

    get direccion(): String {
        return this._direccion;
    }

    set direccion(value: String) {
        this._direccion = value;
    }

    get numero(): String {
        return this._numero;
    }

    set numero(value: String) {
        this._numero = value;
    }

    get latitud(): number {
        return this._latitud;
    }

    set latitud(value: number) {
        this._latitud = value;
    }

    get longitud(): number {
        return this._longitud;
    }

    set longitud(value: number) {
        this._longitud = value;
    }

    get pagina(): String {
        return this._pagina;
    }

    set pagina(value: String) {
        this._pagina = value;
    }

    get horarioApertura(): number {
        return this._horarioApertura;
    }

    set horarioApertura(value: number) {
        this._horarioApertura = value;
    }

    get horarioCierre(): number {
        return this._horarioCierre;
    }

    set horarioCierre(value: number) {
        this._horarioCierre = value;
    }
}