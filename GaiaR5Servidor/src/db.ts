import neo4j, {Driver, Record, Session} from "neo4j-driver"
import {CentroAcopio, Usuario} from "../../entidades";

export default class DB {
    private static instancia: DB;
    private driver: Driver;

    private constructor() {
        try{
            this.driver = neo4j.driver(
                'neo4j://localhost',
                neo4j.auth.basic('neo4j', '1234')
            );
            this._session = this.driver.session();
        }catch (e) {
            console.log(e);
        }
    }

    private readonly _session: Session;

    public get session() {
        return this._session;
    }

    public static obtenerInstancia(): DB {
        if (!DB.instancia) {
            DB.instancia = new DB();
        }
        return DB.instancia;
    }

    desempacarRegistros(registros: Record[], variables: string[] | string): Array<object> {
        let despempaquetado = [];
        if (Array.isArray(variables)) {
            if(registros.length == 0){
                return [];
            }
            despempaquetado = registros.map((registro) => {
                return variables.map((variable) => {
                    return registro.get(variable).properties;
                });
            });
        } else {
            if(registros.length == 0){
                return null;
            }
            despempaquetado = registros.map((registro) => {
                return registro.get(<string>variables).properties;
            });
        }
        return despempaquetado;
    }

    async obtenerCentroPorNombre(nombre: string) {
        let consulta = await this._session.run("MATCH (a:Acopio)-[:Recicla]-(r:Recurso) WHERE a.nombre CONTAINS $nombre RETURN DISTINCT a, r.nombre", {
            nombre: nombre
        });
        let centro = consulta.records[0].get("a").properties;
        centro.recursos = [];
        for (let record of consulta.records.values()) {
            centro.recursos.push(record.get("r.nombre"));
        }
        return centro;
    }

    async asignarSemillasUsuario(cedula: string, semillas: number): Promise<number> {
        let consulta = await this._session.run("MATCH (u:Usuario{cedula:$cedula}) SET u.semillas = u.semillas + $semillas RETURN u", {
            "cedula": cedula,
            "semillas": semillas
        });
        return consulta.records[0].get("u").properties;
    }


    async iniciarRecorrido(cedula: string, centro: string) {
        let props = {
            fecha: Date.now(),
            semillas: 0,
            finalizada: false
        }
        let consulta = await this._session.run("MATCH (u:Usuario{cedula:$cedula}), (a:Acopio{nombre:$centro}) WITH u, a CREATE (u)-[v:Visita $props]->(a) return v", {
            cedula,
            centro,
            props
        });
        return consulta.records[0].get("v").properties;
    }

    async finalizarRecorrido(cedula: string, semillas: number) {
        let consulta = await this._session.run("MATCH (u:Usuario{cedula:$cedula})-[v:Visita{finalizada: false}]-(a:Acopio) SET v.finalizada = true, v.semillas = $semillas RETURN v, a",
            {
                cedula,
                semillas
            });
        return {
            visita: consulta.records[0].get("v").properties,
            centro: consulta.records[0].get("a").properties
        }
    }

    public async crearEntidad(entidad: string, props: object) {
        let consulta = await this._session.run(`CREATE (n:${entidad} $props) RETURN n`, {
            props: props
        });
        return consulta.records[0].get('n').properties;
    }


}