const users = require('./users.json');

module.exports.getUser = async ({ userId }) => {
  const user = users.find((user) => user.id === userId);
  return user;
}
