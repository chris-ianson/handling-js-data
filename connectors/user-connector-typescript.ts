import axios, {AxiosError, AxiosResponse} from "axios";

export async function getUsers(): Promise<any> {
  const validateStatus = {
    validateStatus: (status: any) => (status >= 200 && status < 300) || status === 404
  }

  return axios.get('http://localhost:4000/users', validateStatus).then((response: AxiosResponse) => {
    if(response.status === 404) {
      return [];
    }
    return response.data;
  }).catch((e: AxiosError) => {
    throw e;
  });
}

export async function getUsersByID(id: number): Promise<any> {
  const validateStatus = {
    validateStatus: (status: any) => (status >= 200 && status < 300) || status === 404
  }

  return axios.get('http://localhost:4000/users/' + id, validateStatus).then((response: AxiosResponse) => {
    if(response.status === 404) {
      return [];
    }
    return response.data;
  }).catch((e: AxiosError) => {
    throw e;
  });
}
