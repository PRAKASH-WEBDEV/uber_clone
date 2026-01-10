const userModel = require('../models/user.model');

const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error('Missing required fields');
  }

  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password, // already hashed in controller
  });

  return user;
};

module.exports = {
  createUser,
};
