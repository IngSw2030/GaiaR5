import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import Usuario from "@entidades/Usuario";
import Controlador from "../Controlador";
import AsignarSemillasAleatorias from "../../estrategias/AsignarSemillasAleatorias";
import SuperControlador, {metodoEnum} from "../SuperControlador";
import {LatLng} from "@googlemaps/google-maps-services-js";
import Geografico from "./Geografico";

export default class Usuarios extends SuperControlador implements IControlador{
    server: Express;
    controlador: Controlador;

    constructor(path: string) {
        super(path);
        this.endpoints = [
            {
                etiqueta: "usuario",
                metodo: metodoEnum.GET,
                manejador: async(req, res) => {
                    //TODO: Implementar la recuperacion de un usuario por query
                    //res.send(await this.crearUsuario(req.body.usuario));
                }
            },
            {
                etiqueta: "usuario",
                metodo: metodoEnum.POST,
                manejador: async(req, res) => {
                    res.send(await this.crearUsuario(req.body.usuario));
                }
            },
            {
                etiqueta: "usuario/viajes",
                metodo: metodoEnum.GET,
                manejador: async(req, res) => {
                    let cedula = <string> req.query.cedula;
                    res.send(await this.obtenerHistorialVisitas(cedula));
                }
            },
            {
                etiqueta: "usuario/viaje",
                metodo: metodoEnum.POST,
                manejador: async(req, res) => {
                    res.send(await this.iniciarRecorrido(req.body.inicio, req.body.fin, req.body.cedula, req.body.centro));
                }
            },
            {
                etiqueta: "usuario/viaje",
                metodo: metodoEnum.PATCH,
                manejador: async(req, res) => {
                    res.send(await this.finalizarRecorrido(req.body.cedula, req.body.distancia));
                }
            },
        ]
    }

    instalar(server: Express, controlador:Controlador): void {
        this.server = server;
        this.controlador = controlador;
        super.exponer(this.server);
    }

    async crearUsuario(usuario:Usuario){
        return await DB.obtenerInstancia().crearUsuario(usuario);
    }

    async asignarSemillas(cedula:string, semillas:number){
        return await DB.obtenerInstancia().asignarSemillasUsuario(cedula, semillas);
    }

    async finalizarRecorrido(cedula:string, distancia:number){
        let semillas = new AsignarSemillasAleatorias().calcularSemillas(distancia);
        let visita = await DB.obtenerInstancia().finalizarRecorrido(cedula, semillas);
        await this.asignarSemillas(cedula, semillas);
        return {
            visita
        };
    }

    async iniciarRecorrido(inicio:LatLng, fin:LatLng, cedula:string, centro:string) {
        let moduloGeografico = <Geografico> this.controlador.modulos.get("geografico");
        let direcciones = await moduloGeografico.solicitarRecorrido(inicio, fin);
        await DB.obtenerInstancia().iniciarRecorrido(cedula, centro);
        return direcciones;
    }

    async obtenerHistorialVisitas(cedula:string){
        return await DB.obtenerInstancia().obtenerHistorialVisitas(cedula);
    }
}