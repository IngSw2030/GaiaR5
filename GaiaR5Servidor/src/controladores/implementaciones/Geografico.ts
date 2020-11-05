import IControlador from "../IControlador";
import {Express} from "express";
import {Client, LatLng, TravelMode} from "@googlemaps/google-maps-services-js";
import Controlador from "../Controlador";
import SuperControlador, {metodoEnum} from "../SuperControlador";

export default class Geografico extends SuperControlador implements IControlador {
    server: Express;
    controlador: Controlador;
    private APIKEY = "AIzaSyDm1cQh3R0DKN9fK-n7pwv0kWsTG5mlIEE"
    pruebaInicio = [4.63127345, -74.06408751];
    pruebaFin = [4.64588103, -74.07849526];

    constructor(path: string) {
        super(path);
        this.endpoints = [
            {
                etiqueta: "ruta",
                metodo: metodoEnum.GET,
                manejador: async (req, res) => {
                    console.log(req.query);
                    let inicio = req.query.inicio;
                    let fin = req.query.fin;
                    res.send(await this.solicitarRecorrido([Number(inicio[0]), Number(inicio[1])], [Number(fin[0]), Number(fin[1])]));
                }
            }
        ];
    }

    instalar(server: Express, controlador: Controlador): void {
        this.server = server;
        this.controlador = controlador;
        super.exponer(this.server);
    }

    async solicitarRecorrido(ubicacionUsuario:LatLng, ubicacionCentro:LatLng) {
        const cliente = new Client({});
        let direcciones = await cliente.directions({
            params: {
                origin: ubicacionUsuario,
                destination: ubicacionCentro,
                key: this.APIKEY,
                mode: TravelMode.driving
            }
        });
        return direcciones.data;
    }
}