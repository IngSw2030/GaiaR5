import IControlador from "../IControlador";
import {Express} from "express";
import {Client, LatLng} from "@googlemaps/google-maps-services-js";
import Controlador from "../Controlador";
import DB from "../../db";

export default class Geografico implements IControlador {
    path: string;
    server: Express;
    controlador: Controlador;
    private APIKEY = "AIzaSyDm1cQh3R0DKN9fK-n7pwv0kWsTG5mlIEE"
    pruebaInicio = [4.63127345, -74.06408751];
    pruebaFin = [4.64588103, -74.07849526];

    constructor(path: string) {
        this.path = path;
    }

    install(server: Express, controlador: Controlador): void {
        this.server = server;
        this.controlador = controlador;
        server.post(`${this.path}/solicitarRecorrido`, async (req, res) => {
            res.send(await this.solicitarRecorrido(req.body.ubicacionUsuario, req.body.ubicacionCentro));
        })
        console.log(`Registrando: ${this.path}/solicitarRecorrido`);
        //////////////////////////////////////////////////////////////////
        server.post(`${this.path}/iniciarRecorrido`, async (req, res) => {
            res.send(await this.iniciarRecorrido(req.body.ubicacionUsuario, req.body.ubicacionCentro, req.body.cedula, req.body.centro));
        })
        console.log(`Registrando: ${this.path}/iniciarRecorrido`);
    }

    async solicitarRecorrido(ubicacionUsuario:LatLng, ubicacionCentro:LatLng) {
        const client = new Client({});
        let directions = await client.directions({
            params: {
                origin: ubicacionUsuario,
                destination: ubicacionCentro,
                key: this.APIKEY
            }
        });
        return directions.data;
    }

    async iniciarRecorrido(ubicacionUsuario:LatLng, ubicacionCentro:LatLng, cedula:string, centro:string) {
        const client = new Client({});
        let directions = await client.directions({
            params: {
                origin: ubicacionUsuario,
                destination: ubicacionCentro,
                key: this.APIKEY
            }
        });
        await DB.obtenerInstancia().iniciarRecorrido(cedula, centro);
        return directions.data;
    }
}