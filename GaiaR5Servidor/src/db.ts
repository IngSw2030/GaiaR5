import neo4j, {Driver, Session} from "neo4j-driver"
import {CentroAcopio, Usuario} from "../../entidades";

export default class DB {
    private static instancia: DB;
    private driver: Driver;

    private constructor() {
        this.driver = neo4j.driver(
            'neo4j://localhost',
            neo4j.auth.basic('neo4j', '1234')
        );
        this._session = this.driver.session();
    }

    private _session: Session;

    public get session() {
        return this._session;
    }

    public static obtenerInstancia(): DB {
        if (!DB.instancia) {
            DB.instancia = new DB();
        }
        return DB.instancia;
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

    async obtenerCentrosPorRecurso(recurso: string): Promise<CentroAcopio[]> {
        let consulta = await this._session.run("MATCH (a:Acopio)-[:Recicla]-(r:Recurso) WHERE r.nombre IN $recurso RETURN DISTINCT a.nombre", {
            recurso
        });
        let centros = [];
        for (let record of consulta.records.values()) {
            centros.push(await this.obtenerCentroPorNombre(record.get("a.nombre")));
        }
        return centros;
    }

    async obtenerRecursos(): Promise<string[]> {
        let consulta = await this._session.run("MATCH (r:Recurso) RETURN DISTINCT r.nombre");
        return consulta.records.map((registro) => {
            return registro.get("r.nombre");
        });
    }

    async crearUsuario(usuario: Usuario): Promise<Usuario> {
        let consulta = await this._session.run("CREATE (n:Usuario $props) RETURN n", {
            props: usuario
        });
        let props = consulta.records[0].get('n').properties;
        return new Usuario(props.nombre, props.cedula, props.semillas);
    }

    obtenerUsuario(): Promise<Usuario> {
        return Promise.resolve(new Usuario("", "", 0));
    }

    async asignarSemillasUsuario(cedula: string, semillas: number): Promise<number> {
        let consulta = await this._session.run("MATCH (u:Usuario{cedula:$cedula}) SET u.semillas = u.semillas + $semillas RETURN u", {
            "cedula": cedula,
            "semillas": semillas
        });
        return consulta.records[0].get("u").properties;
    }

    async crearCentroAcopio(centroAcopio: CentroAcopio) {
        let props = await this.crearEntidad("Acopio", centroAcopio);
        return new CentroAcopio(props.nombre, props.direccion, props.numero, props.latitud, props.longitud, props.pagina, props.horarioApertura, props.horarioCierre, props.recursos);
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

    async obtenerHistorialVisitas(cedula: string) {
        let consulta = await this._session.run("MATCH (u:Usuario{cedula:$cedula})-[v:Visita{finalizada:true}]-(a:Acopio) return v, a.nombre", {
            cedula
        });
        let visitas = [];
        for (let record of consulta.records.values()) {
            let visita = {
                visita: record.get("v").properties,
                centro: record.get("a.nombre")
            }
            visitas.push(visita);
        }
        return visitas;
    }

    private async crearEntidad(entidad: string, props: object) {
        let consulta = await this._session.run(`CREATE (n:${entidad} $props) RETURN n`, {
            props: props
        });
        return consulta.records[0].get('n').properties;
    }


}