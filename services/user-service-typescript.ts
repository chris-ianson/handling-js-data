import * as userConnector from '../connectors/user-connector-typescript'
import User from "../models/User";
import {AxiosError} from "axios";

//TODO: Run this and check, think response.data won't work. It's only returning data
export async function getUsers(): Promise<User[]> {
  return userConnector.getUsers().then((response: any) => {
    console.log('response', response);
    return !response.length  ? [] : User.deserialize(response);
  }).catch((e: AxiosError) => {
    console.log('e', e);
    // if(e.response?.status === 404) {
    //   return [];
    // }
    throw e;
  })
}

export async function getUsersByID(id: string): Promise<User | undefined> {
  return await userConnector.getUsersByID(id).then((response: any) => {
    console.log(response);
    if(!response.length) {
      return undefined;
    }
    const users: User[] = User.deserialize(response);
    return users[0];
  }).catch((e: AxiosError) => {
    // if(e.response?.status === 404) {
    //   return undefined;
    // }
    throw e;
  })
}
