import * as userConnector from '../connectors/user-connector-typescript'
import User from "../models/User";
import {AxiosError} from "axios";

export async function getUsers(): Promise<User[]> {
  return await userConnector.getUsers().then((response: any) => {
    return User.deserialize(response.data);
  }).catch((e: AxiosError) => {
    if(e.response?.status === 404) {
      return [];
    }
    throw e
  })
}

export async function getUsersByID(id: string): Promise<User | undefined> {
  return await userConnector.getUsersByID(id).then((response: any) => {
    const users: User[] = User.deserialize(response.data);
    return users[0];
  }).catch((e: AxiosError) => {
    if(e.response?.status === 404) {
      return undefined;
    }
    throw e;
  })
}
