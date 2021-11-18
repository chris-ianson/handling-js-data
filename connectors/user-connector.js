function getUsers() {
  // Calls API and brings back users
  const userData = [
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
      age: "twenty one",
      isDeveloper: "true"
    },
  ];

  return userData;
}

module.exports = {
  getUsers,
};
