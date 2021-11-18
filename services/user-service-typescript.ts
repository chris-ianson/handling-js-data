const userConnector = require('../connectors/user-connector')

function getUsers() {
  const userData = userConnector.getUsers();
  return userData;
}

module.exports = {
  getUsers,
};
