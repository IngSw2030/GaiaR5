export default class Mensaje{
    private _fecha: Date;
    private _hora: Date;

    constructor(fecha: Date, hora: Date) {
        this._fecha = fecha;
        this._hora = hora;
    }

    get fecha(): Date {
        return this._fecha;
    }

    set fecha(value: Date) {
        this._fecha = value;
    }

    get hora(): Date {
        return this._hora;
    }

    set hora(value: Date) {
        this._hora = value;
    }
}