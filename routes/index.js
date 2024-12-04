const express = require("express");
const router = express.Router();
const registerValidator = require("../validators/registerValidator");
const { validationResult } = require("express-validator");
const pool = require("../db/queries");
const { registerController } = require("../controllers/registerFormController");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/register", (req, res) => {
  res.render("registerForm");
});

router.post("/register", registerValidator, registerController);

module.exports = router;
