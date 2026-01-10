const userModel = require("../models/user.model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");

const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });

    const token = user.generateAuthToken();

    // ✅ YAHI SAHI JAGAH HAI
    console.log("USER CREATED:", {
      id: user._id.toString(),
      firstname: user.fullname.firstname,
      lastname: user.fullname.lastname,
      email: user.email,
    });

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
};
