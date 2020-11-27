import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import Controlador from "../Controlador";
import SuperControlador from "../SuperControlador";
import EndPoint, {metodoEnum} from "../EndPoint";
import {CentroAcopio} from "../../../../entidades/index";
import Autentificacion from "../../servicios/Autentificacion";

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
            ),
            new EndPoint(
                "centroAcopio",
                metodoEnum.PATCH,
                async (req, res) => {
                    try {
                        let {admin} = Autentificacion.verificar(req);
                        if(admin){
                            res.send(await this.editarCentroAcopio(CentroAcopio.hidratar(req.body.centroActual), CentroAcopio.hidratar(req.body.centroNuevo)));
                        }else{
                            res.sendStatus(403);
                        }
                    } catch (e) {
                        if (e.message == "Token invalido") {
                            res.sendStatus(403);
                        } else {
                            res.sendStatus(500);
                        }
                    }
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
        let consulta = await DB.obtenerInstancia().session.run("MATCH (a:Acopio)-[:Recicla]-(r:Recurso) WHERE r.nombre IN $recurso RETURN DISTINCT a", {
            recurso
        });
        return DB.obtenerInstancia().desempacarRegistros(consulta.records, "a");
    }

    async obtenerCentroPorNombre(nombre: string) {
        console.log(nombre);
        let query = `MATCH (a:Acopio) WHERE a.nombre =~ '(?i).*${nombre}.*' RETURN DISTINCT a`
        let consulta = await DB.obtenerInstancia().session.run(query, {
            nombre
        });
        return DB.obtenerInstancia().desempacarRegistros(consulta.records, "a");
    }

    async editarCentroAcopio(centroActual: CentroAcopio, centroNuevo: CentroAcopio){
        try {
            await DB.obtenerInstancia().session.run(
                "MATCH (a:Acopio{nombre:$nombre}) SET a+=$centroNuevo RETURN a",
                {
                    nombre: centroActual.nombre,
                    centroNuevo: centroNuevo
                }
            );
            let recursosNuevos = centroNuevo.recursos.filter((recurso) => !centroActual.recursos.includes(recurso));
            let recursosEliminados = centroActual.recursos.filter((recurso) => !centroNuevo.recursos.includes(recurso));
            console.log("recursosNuevos", recursosNuevos);
            console.log("recursosEliminados", recursosEliminados);
            for (let recurso of recursosNuevos) {
                console.log(recurso);
                await DB.obtenerInstancia().session.run(
                    "MATCH (c:Acopio {nombre:$centro}) MERGE (r:Recurso {nombre: $recurso}) WITH c, r CREATE (c)-[recurso:Recicla]->(r) ",
                    {
                        centro: centroNuevo.nombre,
                        recurso: recurso
                    }
                );
            }
            for (let recurso of recursosEliminados) {
                console.log(recurso);
                await DB.obtenerInstancia().session.run(
                    "MATCH (c:Acopio {nombre:$centro})-[recurso:Recicla]-(r:Recurso {nombre: $recurso}) DELETE recurso;",
                    {
                        centro: centroNuevo.nombre,
                        recurso: recurso,
                    }
                )
            }
            return centroNuevo;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}