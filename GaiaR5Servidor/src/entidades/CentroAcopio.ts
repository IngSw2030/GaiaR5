export default class CentroAcopio {
    constructor(nombre: String, direccion: String, numero: String, latitud: number, longitud: number, pagina: String, horarioApertura: number, horarioCierre: number, recursos: string[]) {
        this._nombre = nombre;
        this._direccion = direccion;
        this._numero = numero;
        this._latitud = latitud;
        this._longitud = longitud;
        this._pagina = pagina;
        this._horarioApertura = horarioApertura;
        this._horarioCierre = horarioCierre;
        this._recursos = recursos;
    }

    private _nombre: String;

    get nombre(): String {
        return this._nombre;
    }

    set nombre(value: String) {
        this._nombre = value;
    }

    private _direccion: String;

    get direccion(): String {
        return this._direccion;
    }

    set direccion(value: String) {
        this._direccion = value;
    }

    private _numero: String;

    get numero(): String {
        return this._numero;
    }

    set numero(value: String) {
        this._numero = value;
    }

    private _latitud: number;

    get latitud(): number {
        return this._latitud;
    }

    set latitud(value: number) {
        this._latitud = value;
    }

    private _longitud: number;

    get longitud(): number {
        return this._longitud;
    }

    set longitud(value: number) {
        this._longitud = value;
    }

    private _pagina: String;

    get pagina(): String {
        return this._pagina;
    }

    set pagina(value: String) {
        this._pagina = value;
    }

    //Hora de inicio en formato militar ej: 1500 = 3:00 pm
    private _horarioApertura: number;

    get horarioApertura(): number {
        return this._horarioApertura;
    }

    set horarioApertura(value: number) {
        this._horarioApertura = value;
    }

    private _horarioCierre: number;

    get horarioCierre(): number {
        return this._horarioCierre;
    }

    set horarioCierre(value: number) {
        this._horarioCierre = value;
    }

    private _recursos: string[];

    get recursos(): string[] {
        return this._recursos;
    }

    set recursos(value: string[]) {
        this._recursos = value;
    }
}