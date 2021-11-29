const userConnector = require('../connectors/user-connector-typescript')

function getUsers() {
  const userData = userConnector.getUsers();
  return userData;
}

module.exports = {
  getUsers,
};
