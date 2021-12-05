import User from "../models/User";

export function getUsers(): User[] {
  const userData: User[] = [
    {
      firstName: "Jackie",
      lastName: "Aprile",
      dateOfBirth: '07/05/1954',
      hits: 20,
      isDead: true,
      family: "DiMeo",
      location: 'New Jersey',
    },
    {
      firstName: "Carmela",
      lastName: "Soprano",
      dateOfBirth: '07/05/1963',
      hits: 0,
      isDead: false,
      family: "Gambino",
      location: 'New Jersey',
    },
  ];

  return userData;
}
