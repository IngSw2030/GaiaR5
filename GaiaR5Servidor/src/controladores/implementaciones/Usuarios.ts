import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import Usuario from "@entidades/Usuario";

export default class Usuarios implements IControlador{
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    install(server: Express): void {
        server.post(`${this.path}/crearUsuario`, async(req, res) => {
            res.send(await this.crearUsuario(req.body.usuario));
        })
        console.log(`Registrando: ${this.path}/crearUsuario`);
        //console.log(`Registrando: ${path.join(this.path, "obtenerCentrosPorRecurso")}`);
    }

    async crearUsuario(usuario:Usuario){
        return await DB.obtenerInstancia().crearUsuario(usuario);
    }

    asignarSemillas(usuario:Usuario, semillas:number){

    }
}