import axios from "axios";

export async function getUsers(): Promise<any> {
  return axios.get('http://localhost:4000/users');
}

export async function getUsersByID(id: string): Promise<any> {
  return axios.get('http://localhost:4000/users/' + id);
}
