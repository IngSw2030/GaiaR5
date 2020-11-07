export default class Ubicacion{
    private _latitud: number;
    private _longitud: number;

    constructor(latitud: number, longitud: number) {
        this._latitud = latitud;
        this._longitud = longitud;
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
}