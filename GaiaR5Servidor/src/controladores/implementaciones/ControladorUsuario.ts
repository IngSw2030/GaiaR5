import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import {Usuario} from "../../../../entidades";
import Controlador from "../Controlador";
import AsignarSemillasAleatorias from "../../estrategias/AsignarSemillasAleatorias";
import SuperControlador from "../SuperControlador";
import {LatLng} from "@googlemaps/google-maps-services-js";
import ControladorGeografico from "./ControladorGeografico";
import EndPoint, {metodoEnum} from "../EndPoint";
import Autentificacion from "../../servicios/Autentificacion";

export default class ControladorUsuario extends SuperControlador implements IControlador {
    constructor(path: string) {
        super(path);
        this.endpoints = [
            new EndPoint("usuario",
                metodoEnum.GET,
                async (req, res) => {
                    //TODO: Implementar la recuperacion de un usuario por query
                    //res.send(await this.crearUsuario(req.body.usuario));
                }),
            new EndPoint("usuario",
                metodoEnum.POST,
                async (req, res) => {
                    res.send(await this.crearUsuario(req.body.usuario));
                }),
            new EndPoint(
                "usuario/viajes",
                metodoEnum.GET,
                async (req, res) => {
                    let cedula = <string>req.query.cedula;
                    res.send(await this.obtenerHistorialVisitas(cedula));
                }
            ),
            new EndPoint(
                "usuario/viaje",
                metodoEnum.POST,
                async (req, res) => {
                    res.send(await this.iniciarRecorrido(req.body.inicio, req.body.fin, req.body.cedula, req.body.centro));
                }
            ),
            new EndPoint(
                "usuario/viaje",
                metodoEnum.PATCH,
                async (req, res) => {
                    res.send(await this.finalizarRecorrido(req.body.cedula, req.body.distancia));
                }
            ),
            new EndPoint(
                "usuario/sesion",
                metodoEnum.POST,
                async (req, res) => {
                    try{
                        let token = await this.iniciarSesion(req.body.cedula, req.body.pass);
                        res.send(token);
                    }catch (e) {
                        res.status(401).send(e);
                    }
                }
            ),
            new EndPoint(
                "usuario/testJWT",
                metodoEnum.POST,
                (req, res) => {
                    console.log(req.headers);
                    let token = Autentificacion.verificar(req);
                    try{
                        res.send(token.nombre);
                    }catch (e) {
                        res.status(401).send(e);
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
        return await DB.obtenerInstancia().crearUsuario(usuario);
    }

    async asignarSemillas(cedula: string, semillas: number) {
        return await DB.obtenerInstancia().asignarSemillasUsuario(cedula, semillas);
    }

    async finalizarRecorrido(cedula: string, distancia: number) {
        let semillas = new AsignarSemillasAleatorias().calcularSemillas(distancia);
        let consulta = await DB.obtenerInstancia().session.run("MATCH (u:Usuario{cedula:$cedula})-[v:Visita{finalizada: false}]-(a:Acopio) SET v.finalizada = true, v.semillas = $semillas RETURN v, a",
            {
                cedula,
                semillas
            });
        let visita = {
            visita: consulta.records[0].get("v").properties,
            centro: consulta.records[0].get("a").properties
        }
        await this.asignarSemillas(cedula, semillas);
        return {
            visita
        };
    }

    async iniciarRecorrido(inicio: LatLng, fin: LatLng, cedula: string, centro: string) {
        let props = {
            fecha: Date.now(),
            semillas: 0,
            finalizada: false
        }
        let consulta = await DB.obtenerInstancia().session.run("MATCH (u:Usuario{cedula:$cedula}), (a:Acopio{nombre:$centro}) WITH u, a CREATE (u)-[v:Visita $props]->(a) return v", {
            cedula,
            centro,
            props
        });
        return consulta.records[0].get("v").properties;
    }

    async obtenerHistorialVisitas(cedula: string) {
        return await DB.obtenerInstancia().obtenerHistorialVisitas(cedula);
    }

    async iniciarSesion(cedula: string, pass: string){
        let query = await DB.obtenerInstancia().session.run(
            "MATCH (u:Usuario) WHERE u.cedula = $cedula RETURN u",
            {
                cedula
            }
        );
        let usuario:Usuario = query.records[0].get('u').properties;
        if(pass === usuario.pass){
            let payload = {
                nombre: usuario.nombre,
                cedula: usuario.cedula,
                semillas: usuario.semillas
            }
            return Autentificacion.crearToken(payload);
        }else{
            throw new Error("Credenciales incorrectas");
        }
    }
}