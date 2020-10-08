import IControlador from "../IControlador";
import {Express} from "express";
import CentroAcopio from "@entidades/CentroAcopio";
import Ubicacion from "@entidades/Ubicacion";
export default class Geografico implements IControlador{
    install(server: Express): void {

    }

    solicitarRecorrido(usuario:String, ubicacionUsuario: Ubicacion, centroAcopio:CentroAcopio, ){

    }
}