import {Express} from "express";
import Controlador from "./Controlador";
export default interface IControlador{
    install(server:Express, controlador:Controlador):void;
}