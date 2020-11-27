import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export default class Controlador {
  private static URL: string = "http://6c14dcaf8345.ngrok.io";
  private static token: string = "";

  public static async iniciarSesion(cedula: string, pass: string) {
    let respuesta = await Controlador.post(
      "usuario/sesion",
      {
        cedula,
        pass
      }
    );
    this.token = "Bearer " + respuesta.data;
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
