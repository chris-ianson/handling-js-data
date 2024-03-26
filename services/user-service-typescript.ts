import * as userConnector from '../connectors/user-connector-typescript'
import User from "../models/User";
import {AxiosError} from "axios";

export async function getUsers(): Promise<User[]> {
  return userConnector.getUsers().then((response: any) => {
    return !response.length  ? [] : User.deserialize(response);
  }).catch((e: AxiosError) => {
    throw e;
  })
}

export async function getUsersByID(id: number): Promise<User | undefined> {
  return await userConnector.getUsersByID(id).then((response: any) => {
    if(!response.length) {
      return undefined;
    }
    const users: User[] = User.deserialize(response);
    return users[0];
  }).catch((e: AxiosError) => {
    throw e;
  })
}
