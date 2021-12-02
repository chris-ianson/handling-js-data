import User from "../models/User";

export function getUsers(): User[] {
  const userData: User[] = [
    {
      firstName: "Chris",
      dateOfBirth: '07/05/2000',
      age: 21,
      isDeveloper: true,
      location: 'Newcastle'
    },
    {
      firstName: "Thomas",
      dateOfBirth: "7th May 2000",
      age: 21,
      isDeveloper: true
    },
  ];

  return userData;
}
