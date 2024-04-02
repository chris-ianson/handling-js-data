import axios, {AxiosError, AxiosResponse} from "axios";

export default class Connector {

  static validateStatus = {
    validateStatus: (status: number) => (status >= 200 && status < 300) || status === 404
  }

  getResponse = (response: AxiosResponse): object[] => response.status === 404 ? [] : response.data;

  async getUsers(): Promise<object[]> {
    return axios.get('http://localhost:4000/users', Connector.validateStatus).then(
      this.getResponse
    ).catch((e: AxiosError) => {
      throw e;
    });
  }

  async getUsersByID(id: number): Promise<object[]> {
    return axios.get('http://localhost:4000/users/' + id, Connector.validateStatus).then(
      this.getResponse
    ).catch((e: AxiosError) => {
      throw e;
    });
  }
}

