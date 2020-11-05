import {Express} from "express";
import Controlador from "./Controlador";
export default interface IControlador{
    instalar(server:Express, controlador:Controlador):void;
}