import ControladorCentroAcopio from "./implementaciones/ControladorCentroAcopio";
import IControlador from "./IControlador";
import {Express} from "express";
import ControladorUsuario from "./implementaciones/ControladorUsuario";
import ControladorGeografico from "./implementaciones/ControladorGeografico";
import ControladorPost from "./implementaciones/ControladorPost";

export default class Controlador{
    modulos: Map<string, IControlador> = new Map<string, IControlador>()
    constructor(server: Express) {
        this.modulos.set("centrosAcopio", new ControladorCentroAcopio(""));
        this.modulos.set("usuarios", new ControladorUsuario(""));
        this.modulos.set("geografico", new ControladorGeografico(""));
        this.modulos.set("posts", new ControladorPost(""));
        for(let modulo of this.modulos.values()){
            modulo.instalar(server, this);
        }
    }

}