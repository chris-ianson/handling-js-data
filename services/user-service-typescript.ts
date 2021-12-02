import * as userConnector from '../connectors/user-connector-typescript'
import User from "../models/User";

export function getUsers(): User[] {
  const userData: User[] = userConnector.getUsers();

  return userData;
}
