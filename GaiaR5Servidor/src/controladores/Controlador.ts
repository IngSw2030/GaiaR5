import CentrosAcopio from "./implementaciones/CentrosAcopio";
import IControlador from "./IControlador";
import {Express} from "express";
import Usuarios from "./implementaciones/Usuarios";

export default class Controlador{
    modulos: IControlador[] = []
    constructor(server: Express) {
        this.modulos = [
            new CentrosAcopio("/centrosAcopio"),
            new Usuarios("/usuarios")
        ]
        for(let modulo of this.modulos){
            modulo.install(server);
        }

    }

}