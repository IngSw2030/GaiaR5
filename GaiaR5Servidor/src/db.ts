import neo4j, {Driver, Record, Session} from "neo4j-driver"

export default class DB {
    private static instancia: DB;
    private driver: Driver;
    private readonly _session: Session;

    private constructor() {
        try {
            this.driver = neo4j.driver(
                'neo4j://localhost',
                neo4j.auth.basic('neo4j', '1234')
            );
            this._session = this.driver.session();
        } catch (e) {
            console.log(e);
        }
    }

    public get session() {
        return this._session;
    }

    public static obtenerInstancia(): DB {
        if (!DB.instancia) {
            DB.instancia = new DB();
        }
        return DB.instancia;
    }

    public desempacarRegistros(registros: Record[], variables: string[] | string): Array<any> {
        if (registros.length == 0) return null;
        let desempaquetado = [];
        if (Array.isArray(variables)) {
            //Tenemos varias variables
            registros.forEach((registro) => {
                let reg = {};
                variables.forEach((variable) => {
                    reg[variable] = registro.get(variable).properties;
                });
                desempaquetado.push(reg);
            });
        } else {
            //Tenemos una sola variable
            registros.forEach((registro) => {
                desempaquetado.push(registro.get(variables).properties);
            });
        }
        return desempaquetado;
    }

    public desempacarRegistro(registro: Record, variables: string[] | string): any {
        if (!registro) return null;
        if (Array.isArray(variables)) {
            //Tenemos varias variables
            let reg = {};
            variables.forEach((variable) => {
                reg[variable] = registro.get(variable).properties;
            });
            return reg;
        } else {
            //Tenemos una sola variable
            return registro.get(variables).properties;
        }
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