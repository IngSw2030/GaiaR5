import IControlador from "../IControlador";
import {Express} from "express";
import DB from "../../db";
import Usuario from "@entidades/Usuario";
import Controlador from "../Controlador";
import ISemillas from "../../estrategias/ISemillas";
import AsignarSemillasAleatorias from "../../estrategias/AsignarSemillasAleatorias";

export default class Usuarios implements IControlador{
    path: string;
    server: Express;
    controlador: Controlador;

    constructor(path: string) {
        this.path = path;
    }

    install(server: Express, controlador:Controlador): void {
        this.server = server;
        this.controlador = controlador;
        server.post(`${this.path}/crearUsuario`, async(req, res) => {
            res.send(await this.crearUsuario(req.body.usuario));
        })
        console.log(`Registrando: ${this.path}/crearUsuario`);


        server.post(`${this.path}/asignarSemillas`, async(req, res) => {
            res.send(await this.asignarSemillas(req.body.cedula, req.body.semillas));
        })
        console.log(`Registrando: ${this.path}/asignarSemillas`);


        server.post(`${this.path}/finalizarRecorrido`, async(req, res) => {
            res.send(await this.finalizarRecorrido(req.body.cedula, req.body.distancia));
        })
        console.log(`Registrando: ${this.path}/finalizarRecorrido`);


        server.post(`${this.path}/obtenerHistorialVisitas`, async(req, res) => {
            res.send(await this.obtenerHistorialVisitas(req.body.cedula));
        })
        console.log(`Registrando: ${this.path}/obtenerHistorialVisitas`);
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
        let nodo = await this.asignarSemillas(cedula, semillas);
        return {
            visita
        };
    }

    async obtenerHistorialVisitas(cedula:string){
        return await DB.obtenerInstancia().obtenerHistorialVisitas(cedula);
    }
}