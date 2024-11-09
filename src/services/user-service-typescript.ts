import User from "../models/User";
import {AxiosError} from "axios";
import Connector from "../connectors/user-connector-typescript";

const connectorInstance = new Connector();

export async function getUsers(): Promise<User[]> {
  return connectorInstance.getUsers().then((response: object[]) =>
    !response.length  ? [] : User.deserialize(response)
  ).catch((e: AxiosError) => {
    throw e;
  })
}

export async function getUsersByID(id: number): Promise<User | undefined> {
  return await connectorInstance.getUsersByID(id).then((response: object[]) => {
    return response.length ? User.deserialize(response)[0] : undefined
  }
  ).catch((e: AxiosError) => {
    throw e;
  })
}
