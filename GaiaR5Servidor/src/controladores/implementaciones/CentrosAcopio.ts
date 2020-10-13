import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";

export default class CentrosAcopio implements IControlador{
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    install(server: Express): void {
        server.get(`${this.path}/obtenerRecursos`, async (req, res) => {
            res.send(await this.obtenerRecursos());
        });
        console.log(`Registrando: ${this.path}/obtenerRecursos`);
        server.post(`${this.path}/obtenerCentrosPorRecurso`, async (req, res) =>{
            return await this.obtnerCentrosPorRecurso(req.body.filtro);
        });
        console.log(`Registrando: ${this.path}/obtenerCentrosPorRecurso`);
    }

    async obtenerRecursos(){
        return await DB.obtenerInstancia().obtenerRecursos();
    }

    async obtnerCentrosPorRecurso(recurso){
        return await DB.obtenerInstancia().obtenerCentrosPorRecurso(recurso);
    }
}