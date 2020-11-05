import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import Controlador from "../Controlador";
import SuperControlador, {EndPoint, metodoEnum} from "../SuperControlador";

export default class CentrosAcopio extends SuperControlador implements IControlador{
    server: Express;
    controlador: Controlador;

    constructor(path: string) {
        super(path);
        this.endpoints = [
            {
                etiqueta: "recursos",
                metodo: metodoEnum.GET,
                manejador: async (req, res) => {
                    res.send(await this.obtenerRecursos());
                }
            },
            {
                etiqueta: "centroAcopio/recurso",
                metodo: metodoEnum.GET,
                manejador: async (req, res) =>{
                    console.log("Recurso: ", req.query.recurso);
                    res.send(await this.obtenerCentrosPorRecurso(<string>req.query.recurso));
                }
            },
            {
                etiqueta: "centroAcopio",
                metodo: metodoEnum.POST,
                manejador: async (req, res) =>{
                    res.send(await this.crearCentroAcopio(req.body.centroAcopio));
                }
            },
            {
                etiqueta: "centroAcopio",
                metodo: metodoEnum.GET,
                manejador: async (req, res) =>{
                    res.send(await this.obtenerCentroPorNombre(<string> req.query.nombre));
                    res.sendStatus(200);
                }
            },
        ];
    }

    instalar(server: Express, controlador:Controlador): void {
        this.server = server;
        this.controlador = controlador;
        super.exponer(this.server);
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