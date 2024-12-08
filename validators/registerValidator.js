const { body } = require("express-validator");

const registerValidator = [
  body("full_name")
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Full name must contain only letters and spaces."),
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const messageValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters.")
    .escape(),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Text is required.")
    .isLength({ max: 500 })
    .withMessage("Text cannot exceed 500 characters.")
    .escape(),
];

module.exports = { registerValidator, messageValidator };
