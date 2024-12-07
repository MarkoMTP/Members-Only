const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const {
  registerValidator,
  messageValidator,
} = require("../validators/registerValidator");
const { validationResult } = require("express-validator");

const pool = require("../db/queries");
const { registerController } = require("../controllers/registerFormController");
const { secretFormController } = require("../controllers/secretFormController");
const { newMsgController } = require("../controllers/newMsgController");

router.get("/", (req, res) => {
  res.render("homepage", { user: req.user });
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

router.get("/login", (req, res) => {
  res.render("loginForm");
});

router.post(
  "/login",
  passport.authenticate("user-login", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/newMsg", (req, res) => {
  res.render("newMsgForm");
});

router.post("/newMsg", messageValidator, newMsgController);

module.exports = router;
