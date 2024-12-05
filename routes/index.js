const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const registerValidator = require("../validators/registerValidator");
const { validationResult } = require("express-validator");
const pool = require("../db/queries");
const { registerController } = require("../controllers/registerFormController");
const { secretFormController } = require("../controllers/secretFormController");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/register", (req, res) => {
  res.render("registerForm");
});

router.post("/register", registerValidator, registerController);

router.get("/joinSecretClub", (req, res) => {
  res.render("clubJoinForm");
});

router.post(
  "/joinSecretClub",
  passport.authenticate("club-passcode", { session: false }),
  secretFormController
);

module.exports = router;
