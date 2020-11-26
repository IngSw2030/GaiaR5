import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import Controlador from "../Controlador";
import SuperControlador from "../SuperControlador";
import EndPoint, {metodoEnum} from "../EndPoint";

export default class ControladorCentroAcopio extends SuperControlador implements IControlador {
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
                    res.send(await this.crearCentroAcopio(req.body));
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
        let centro = await DB.obtenerInstancia().crearEntidad("Acopio", centroAcopio);
        for (let recurso of centro.recursos) {
            await DB.obtenerInstancia().session.run(
                "MATCH (c:Acopio {nombre: $nombre}) MERGE (r:Recurso {nombre: $recurso}) WITH c, r CREATE (c)-[:Recicla]->(r)",
                {
                    nombre: centro.nombre,
                    recurso: recurso
                }
            );
        }
        return centro;
    }

    async obtenerRecursos() {
        let consulta = await DB.obtenerInstancia().session.run("MATCH (r:Recurso) RETURN DISTINCT r.nombre");
        return consulta.records.map((registro) => {
            return registro.get("r.nombre");
        });
    }

    async obtenerCentrosPorRecurso(recurso: string) {
        let consulta = await DB.obtenerInstancia().session.run("MATCH (a:Acopio)-[:Recicla]-(r:Recurso) WHERE r.nombre IN $recurso RETURN DISTINCT a.nombre", {
            recurso
        });
        let centros = [];
        for (let record of consulta.records.values()) {
            centros.push(await this.obtenerCentroPorNombre(record.get("a.nombre")));
        }
        return centros;
    }

    async obtenerCentroPorNombre(nombre: string) {
        console.log(nombre);
        let query = `MATCH (a:Acopio) WHERE a.nombre =~ '(?i).*${nombre}.*' RETURN DISTINCT a`
        let consulta = await DB.obtenerInstancia().session.run(query, {
            nombre
        });
        console.log(consulta.records);
        //TODO: Hay que hacer que no empaquete de mas los registros.
        return DB.obtenerInstancia().desempacarRegistros(consulta.records, ["a"]);
    }
}