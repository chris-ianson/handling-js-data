import axios, {AxiosError, AxiosResponse} from "axios";
import { environment } from "../config/environment.server";

export default class Connector {

  static url = () =>
    environment.BACKEND_PROTOCOL + '://' + environment.BACKEND_HOST + environment.BACKEND_URI

  static validateStatus = {
    validateStatus: (status: number) => (status >= 200 && status < 300) || status === 404
  }

  getResponse = (response: AxiosResponse): object[] => response.status === 404 ? [] : response.data;

  async getUsers(): Promise<object[]> {
    return axios.get(Connector.url(), Connector.validateStatus).then(
      this.getResponse
    ).catch((e: AxiosError) => {
      throw e;
    });
  }

  async getUsersByID(id: number): Promise<object[]> {
    return axios.get(Connector.url() + '/' + id, Connector.validateStatus).then(
      this.getResponse
    ).catch((e: AxiosError) => {
      throw e;
    });
  }
}

