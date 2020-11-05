import CentrosAcopio from "./implementaciones/CentrosAcopio";
import IControlador from "./IControlador";
import {Express} from "express";
import Usuarios from "./implementaciones/Usuarios";
import Geografico from "./implementaciones/Geografico";

export default class Controlador{
    modulos: Map<string, IControlador> = new Map<string, IControlador>()
    constructor(server: Express) {
        this.modulos.set("centrosAcopio", new CentrosAcopio(""));
        this.modulos.set("usuarios", new Usuarios(""));
        this.modulos.set("geografico", new Geografico(""));
        for(let modulo of this.modulos.values()){
            modulo.instalar(server, this);
        }
    }

}