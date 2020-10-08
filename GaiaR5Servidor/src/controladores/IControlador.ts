import {Express} from "express";
export default interface IControlador{
    install(server:Express):void
}