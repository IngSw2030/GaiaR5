import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import Controlador from "../Controlador";

export default class CentrosAcopio implements IControlador{
    path: string;
    server: Express;
    controlador: Controlador;

    constructor(path: string) {
        this.path = path;
    }

    install(server: Express, controlador:Controlador): void {
        this.server = server;
        this.controlador = controlador;
        server.get(`${this.path}/obtenerRecursos`, async (req, res) => {
            res.send(await this.obtenerRecursos());
        });
        console.log(`Registrando: ${this.path}/obtenerRecursos`);
        /////////////////////////////////////////////////////////////
        server.post(`${this.path}/obtenerCentrosPorRecurso`, async (req, res) =>{
            res.send(await this.obtenerCentrosPorRecurso(req.body.recurso));
        });
        console.log(`Registrando: ${this.path}/obtenerCentrosPorRecurso`);
        /////////////////////////////////////////////////////////////
        server.post(`${this.path}/crearCentroAcopio`, async (req, res) =>{
            res.send(await this.crearCentroAcopio(req.body.centroAcopio));
        });
        console.log(`Registrando: ${this.path}/crearCentroAcopio`);
        /////////////////////////////////////////////////////////////
        server.post(`${this.path}/obtenerCentroPorNombre`, async (req, res) =>{
            res.send(await this.obtenerCentroPorNombre(req.body.nombre));
        });
        console.log(`Registrando: ${this.path}/obtenerCentroPorNombre`);
        /////////////////////////////////////////////////////////////
    }

    async crearCentroAcopio(centroAcopio){
        return await DB.obtenerInstancia().crearCentroAcopio(centroAcopio);
    }

    async obtenerRecursos(){
        return await DB.obtenerInstancia().obtenerRecursos();
    }

    async obtenerCentrosPorRecurso(recurso:string){
        return await DB.obtenerInstancia().obtenerCentrosPorRecurso(recurso);
    }

    async obtenerCentroPorNombre(nombre:string){
        return await DB.obtenerInstancia().obtenerCentroPorNombre(nombre);
    }
}