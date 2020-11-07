import Usuario from "@entidades/Usuario";

export default class Chat {
    constructor(receptor: Usuario, mensajes: Chat[]) {
        this._receptor = receptor;
        this._mensajes = mensajes;
    }

    private _receptor: Usuario;

    get receptor(): Usuario {
        return this._receptor;
    }

    set receptor(value: Usuario) {
        this._receptor = value;
    }

    private _mensajes: Chat[];

    get mensajes(): Chat[] {
        return this._mensajes;
    }

    set mensajes(value: Chat[]) {
        this._mensajes = value;
    }
}