import User from "../models/User";

export function getUsers(): User[] {
  const userData: object[] = [
    {
      firstName: "Jackie",
      isDead: true,
      hits: 20,
      lastName: "Aprile",
      location: 'New Jersey',
      dateOfBirth: '07/05/1954',
      family: "DiMeo",
    },
    {
      dateOfBirth: '07/05/1963',
      hits: 0,
      firstName: "Carmela",
      location: 'New Jersey',
      isDead: false,
      lastName: "Soprano",
      family: "Gambino",
    },
  ];

  return User.deserialize(userData);
}
