import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import {Mensaje, Usuario} from "../../../../entidades";
import Controlador from "../Controlador";
import AsignarSemillasAleatorias from "../../estrategias/AsignarSemillasAleatorias";
import SuperControlador from "../SuperControlador";
import EndPoint, {metodoEnum} from "../EndPoint";
import Autentificacion from "../../servicios/Autentificacion";
import {int as neo4jInt} from 'neo4j-driver'
import Integer from "neo4j-driver/types/integer";

export default class ControladorUsuario extends SuperControlador implements IControlador {
    constructor(path: string) {
        super(path);
        this.endpoints = [
            new EndPoint("usuario",
                metodoEnum.GET,
                async (req, res) => {
                    try {
                        console.log(req.query);
                        if (req.query.cedula) {
                            //Buscando por cedula
                            res.send(await this.usuarioPorCedula(<string>req.query.cedula));
                        } else if (req.query.nombre) {
                            //Buscando por nombre
                            res.send(await this.usuarioPorNombre(<string>req.query.nombre));
                        } else {
                            res.sendStatus(404);
                        }
                    } catch (e) {
                        console.log(e);
                        res.sendStatus(401);
                    }
                }),
            new EndPoint("usuario",
                metodoEnum.POST,
                async (req, res) => {
                    console.log(req.body);
                    res.send(await this.crearUsuario(req.body));
                }),
            new EndPoint(
                "usuario/viajes",
                metodoEnum.GET,
                async (req, res) => {
                    let {cedula} = Autentificacion.verificar(req);
                    res.send(await this.obtenerHistorialViajes(cedula, neo4jInt(<string>req.query.limite)));
                }
            ),
            new EndPoint(
                "usuario/viaje",
                metodoEnum.POST,
                async (req, res) => {
                    let {cedula} = Autentificacion.verificar(req);
                    res.send(await this.iniciarViaje(cedula, req.body.centro));
                }
            ),
            new EndPoint(
                "usuario/viaje",
                metodoEnum.PATCH,
                async (req, res) => {
                    let {cedula} = Autentificacion.verificar(req);
                    res.send(await this.finalizarViaje(cedula, req.body.distancia));
                }
            ),
            new EndPoint(
                "usuario/sesion",
                metodoEnum.POST,
                async (req, res) => {
                    try {
                        let token = await this.iniciarSesion(req.body.cedula, req.body.pass);
                        res.send(token);
                    } catch (e) {
                        res.status(401).send(e);
                    }
                }
            ),
            new EndPoint(
                "usuario/mensaje",
                metodoEnum.POST,
                async (req, res) => {
                    try {
                        let {cedula} = Autentificacion.verificar(req);
                        res.send(await this.enviarMensaje(cedula, req.body.destinatario, req.body.mensaje));
                    } catch (e) {
                        res.sendStatus(401);
                    }
                }
            ),
            new EndPoint(
                "usuario/mensajes/nuevo",
                metodoEnum.GET,
                async (req, res) => {
                    try {
                        let {cedula} = Autentificacion.verificar(req);
                        let buzon = await this.verBuzon(cedula);
                        if (buzon) {
                            res.send(buzon);
                        } else {
                            res.sendStatus(404);
                        }
                    } catch (e) {
                        console.log(e);
                        res.sendStatus(401);
                    }
                }
            ),
            new EndPoint(
                "usuario/mensajes",
                metodoEnum.GET,
                async (req, res) => {
                    try {
                        let {cedula} = Autentificacion.verificar(req);
                        let buzon = await this.buzonTotal(cedula);
                        if (buzon) {
                            res.send(buzon);
                        } else {
                            res.sendStatus(404);
                        }
                    } catch (e) {
                        console.log(e);
                        res.sendStatus(401);
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

    async crearUsuario(usuario: Usuario) {
        let consulta = await DB.obtenerInstancia().session.run("CREATE (n:Usuario $usuario) RETURN n", {
            usuario
        });
        let props = consulta.records[0].get('n').properties;
        delete props.pass;
        return new Usuario(props.nombre, props.cedula, props.email);
    }

    async asignarSemillas(cedula: string, semillas: number) {
        return await DB.obtenerInstancia().asignarSemillasUsuario(cedula, semillas);
    }

    async iniciarViaje(cedula: string, centro: string) {
        let viaje = {
            fecha: Date.now(),
            semillas: 0,
            finalizada: false
        }
        let consulta = await DB.obtenerInstancia().session.run("MATCH (u:Usuario{cedula:$cedula}), (a:Acopio{nombre:$centro}) WITH u, a CREATE (u)-[v:Visita $viaje]->(a) return v", {
            cedula,
            centro,
            viaje
        });
        return consulta.records[0].get("v").properties;
    }

    async finalizarViaje(cedula: string, distancia: number) {
        let semillas = new AsignarSemillasAleatorias().calcularSemillas(distancia);
        let consulta = await DB.obtenerInstancia().session.run("MATCH (u:Usuario{cedula:$cedula})-[v:Visita{finalizada: false}]-(a:Acopio) SET v.finalizada = true, v.semillas = $semillas RETURN v, a",
            {
                cedula,
                semillas
            });
        await this.asignarSemillas(cedula, semillas);
        return {
            visita: consulta.records[0].get("v").properties,
            centro: consulta.records[0].get("a").properties
        };
    }

    async obtenerHistorialViajes(cedula: string, limite: Integer) {
        let consulta = await DB.obtenerInstancia().session.run(
            "MATCH (u:Usuario{cedula:$cedula})-[v:Visita{finalizada:true}]-(a:Acopio) RETURN v, a.nombre ORDER BY v.fecha DESC LIMIT $limite",
            {
                cedula,
                limite
            });
        let visitas = [];
        for (let record of consulta.records.values()) {
            visitas.push({
                visita: record.get("v").properties,
                centro: record.get("a.nombre")
            });
        }
        return visitas;
    }

    async iniciarSesion(cedula: string, pass: string) {
        let query = await DB.obtenerInstancia().session.run(
            "MATCH (u:Usuario) WHERE u.cedula = $cedula RETURN u",
            {
                cedula
            }
        );
        let usuario = query.records[0].get('u').properties;
        if (pass === usuario.pass) {
            let payload = {
                nombre: usuario.nombre,
                cedula: usuario.cedula,
                semillas: usuario.semillas,
                admin: false
            }
            if (usuario.admin) {
                payload.admin = true;
            }
            return Autentificacion.crearToken(payload);
        } else {
            throw new Error("Credenciales incorrectas");
        }
    }

    async usuarioPorCedula(cedula: string) {
        let consulta = await DB.obtenerInstancia().session.run("MATCH (u:Usuario{cedula:$cedula}) RETURN u", {
            cedula
        });
        let usuario = DB.obtenerInstancia().desempacarRegistro(consulta.records[0], "u");
        delete usuario.pass;
        return usuario;
    }

    async enviarMensaje(autor: string, destinatario: string, mensaje: string) {
        let mensajeObj = new Mensaje(autor, destinatario, mensaje);
        let consulta = await DB.obtenerInstancia().session.run("MATCH (u1:Usuario{cedula:$autor}), (u2:Usuario{cedula:$dest}) CREATE (u1)-[m:Mensaje $mensaje]->(u2) RETURN m", {
            autor: autor,
            dest: destinatario,
            mensaje: mensajeObj
        });
        return DB.obtenerInstancia().desempacarRegistro(consulta.records[0], "m");
    }

    async verBuzon(cedula: string) {
        console.log(cedula);
        let consulta = await DB.obtenerInstancia().session.run("MATCH (usuario:Usuario { cedula: $cedula })<-[m:Mensaje {leido: FALSE}]-() SET m.leido = TRUE RETURN m ORDER BY m.fecha", {
            cedula
        });
        console.log(consulta.records);
        return DB.obtenerInstancia().desempacarRegistros(consulta.records, "m");
    }

    async usuarioPorNombre(nombre: string) {
        let query = `MATCH (u:Usuario) WHERE u.nombre =~ '(?i).*${nombre}.*' RETURN u`
        let consulta = await DB.obtenerInstancia().session.run(query);
        return DB.obtenerInstancia().desempacarRegistros(consulta.records, "u");
    }

    async buzonTotal(cedula: string) {
        let consulta = await DB.obtenerInstancia().session.run("MATCH (usuario:Usuario { cedula: $cedula })<-[m:Mensaje {leido: TRUE}]-() RETURN m ORDER BY m.fecha", {
            cedula
        });
        console.log(consulta.records);
        return DB.obtenerInstancia().desempacarRegistros(consulta.records, "m");
    }

}