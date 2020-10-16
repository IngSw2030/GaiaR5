import CentrosAcopio from "./implementaciones/CentrosAcopio";
import IControlador from "./IControlador";
import {Express} from "express";
import Usuarios from "./implementaciones/Usuarios";
import Geografico from "./implementaciones/Geografico";

export default class Controlador{
    modulos: Map<string, IControlador> = new Map<string, IControlador>()
    constructor(server: Express) {
        this.modulos.set("centrosAcopio", new CentrosAcopio("/centrosAcopio"));
        this.modulos.set("usuarios", new Usuarios("/usuarios"));
        this.modulos.set("geografico", new Geografico("/geografico"));
        for(let modulo of this.modulos.values()){
            modulo.install(server, this);
        }
    }

}