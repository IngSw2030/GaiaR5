import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import Controlador from "../Controlador";
import SuperControlador from "../SuperControlador";
import EndPoint, {metodoEnum} from "../EndPoint";

export default class CentrosAcopio extends SuperControlador implements IControlador {
    server: Express;
    controlador: Controlador;

    constructor(path: string) {
        super(path);
        this.endpoints = [
            new EndPoint(
                "recursos",
                metodoEnum.GET,
                async (req, res) => {
                    res.send(await this.obtenerRecursos());
                }
            ),
            new EndPoint(
                "centroAcopio/recurso",
                metodoEnum.GET,
                async (req, res) => {
                    console.log("Recurso: ", req.query.recurso);
                    res.send(await this.obtenerCentrosPorRecurso(<string>req.query.recurso));
                }
            ),
            new EndPoint(
                "centroAcopio",
                metodoEnum.POST,
                async (req, res) => {
                    res.send(await this.crearCentroAcopio(req.body.centroAcopio));
                }
            ),
            new EndPoint(
                "centroAcopio",
                metodoEnum.GET,
                async (req, res) => {
                    res.send(await this.obtenerCentroPorNombre(<string>req.query.nombre));
                }
            )
        ];
    }

    instalar(server: Express, controlador: Controlador): void {
        this.server = server;
        this.controlador = controlador;
        super.exponer();
    }

    async crearCentroAcopio(centroAcopio) {
        return await DB.obtenerInstancia().crearCentroAcopio(centroAcopio);
    }

    async obtenerRecursos() {
        return await DB.obtenerInstancia().obtenerRecursos();
    }

    async obtenerCentrosPorRecurso(recurso: string) {
        return await DB.obtenerInstancia().obtenerCentrosPorRecurso(recurso);
    }

    async obtenerCentroPorNombre(nombre: string) {
        return await DB.obtenerInstancia().obtenerCentroPorNombre(nombre);
    }
}