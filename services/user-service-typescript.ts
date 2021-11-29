const userConnector = require('../connectors/user-connector-typescript')

function getUsers() {
  const userData = userConnector.getUsersTS();
  return userData;
}

module.exports = {
  getUsers,
};
