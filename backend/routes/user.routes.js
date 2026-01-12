const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password')
      .isLength({ min: 6, max: 12 })
      .withMessage('Password must be 6–12 characters long'),
    body('fullname.firstname')
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage('First name is required'),
  ],
  userController.registerUser
);

router.post('/login', [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password')
    .isLength({ min: 6, max: 12 })
    .withMessage('Password must be 6–12 characters long'),
  userController.loginUser,
],

userController.loginUser



);

module.exports = router;
