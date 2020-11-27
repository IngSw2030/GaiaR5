import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Cookies} from "quasar";

export default class Controlador {
  private static URL: string = "http://66e295d86ba6.ngrok.io";
  private static token: string = "";

  public static cerrarSesion() {
    this.token = "";
    return true;
  }

  public static async iniciarSesion(cedula: string, pass: string) {
    try {
      let respuesta = await Controlador.post(
        "usuario/sesion",
        {
          cedula,
          pass
        }
      );
      Cookies.set("token", respuesta.data);
      this.token = "Bearer " + respuesta.data;
      console.log(this.token);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public static async get(recurso: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      return await axios.get(`${this.URL}/${recurso}`, this.tokenizar(config));
    } catch (e) {
      throw e;
    }
  }

  public static async post(recurso: string, payload: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      return await axios.post(`${this.URL}/${recurso}`, payload, this.tokenizar(config));
    } catch (e) {
      throw e;
    }
  }

  public static async put(recurso: string, payload: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      return await axios.put(`${this.URL}/${recurso}`, payload, this.tokenizar(config));
    } catch (e) {
      throw e;
    }
  }

  public static async delete(recurso: string, config: AxiosRequestConfig): Promise<any> {
    try {
      return await axios.delete(`${this.URL}/${recurso}`, this.tokenizar(config));
    } catch (e) {
      throw e;
    }
  }

  public static async patch(recurso: string, payload: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      return await axios.patch(`${this.URL}/${recurso}`, payload, this.tokenizar(config));
    } catch (e) {
      throw e;
    }
  }


  private static tokenizar(config: AxiosRequestConfig | undefined): AxiosRequestConfig | undefined {
    let cookie = Cookies.get("token");
    if (cookie) {
      this.token = "Bearer " + cookie;
    }
    if (this.token != "") {
      if (config) {
        if (config.headers) {
          config.headers = {
            ...config.headers,
            Authorization: this.token
          }
          return config;
        } else {
          config.headers = {
            Authorization: this.token
          }
        }
      } else {
        config = {
          headers: {
            Authorization: this.token
          }
        }
      }
      return config;
    } else {
      return config;
    }
  }
}
