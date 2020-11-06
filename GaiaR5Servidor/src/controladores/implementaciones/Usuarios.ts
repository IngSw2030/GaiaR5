import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import Usuario from "@entidades/Usuario";
import Controlador from "../Controlador";
import AsignarSemillasAleatorias from "../../estrategias/AsignarSemillasAleatorias";
import SuperControlador from "../SuperControlador";
import {LatLng} from "@googlemaps/google-maps-services-js";
import Geografico from "./Geografico";
import EndPoint, {metodoEnum} from "../EndPoint";
import {decode, encode} from "jwt-simple"

const SECRETO = "Tw5Ingesoft"

export default class Usuarios extends SuperControlador implements IControlador {
    server: Express;
    controlador: Controlador;

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
                    let tokenStr = req.headers.authorization.split(" ")[1];
                    try{
                        let token = decode(tokenStr, SECRETO);
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
        super.exponer(this.server);
    }

    async crearUsuario(usuario: Usuario) {
        return await DB.obtenerInstancia().crearUsuario(usuario);
    }

    async asignarSemillas(cedula: string, semillas: number) {
        return await DB.obtenerInstancia().asignarSemillasUsuario(cedula, semillas);
    }

    async finalizarRecorrido(cedula: string, distancia: number) {
        let semillas = new AsignarSemillasAleatorias().calcularSemillas(distancia);
        let visita = await DB.obtenerInstancia().finalizarRecorrido(cedula, semillas);
        await this.asignarSemillas(cedula, semillas);
        return {
            visita
        };
    }

    async iniciarRecorrido(inicio: LatLng, fin: LatLng, cedula: string, centro: string) {
        let moduloGeografico = <Geografico>this.controlador.modulos.get("geografico");
        let direcciones = await moduloGeografico.solicitarRecorrido(inicio, fin);
        await DB.obtenerInstancia().iniciarRecorrido(cedula, centro);
        return direcciones;
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
            return encode(payload, SECRETO);
        }else{
            throw new Error("Credenciales incorrectas");
        }
    }
}