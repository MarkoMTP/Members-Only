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
const { homepageController } = require("../controllers/homepageController");
const { adminLoginController } = require("../controllers/adminLoginController");
const { deleteMsgController } = require("../controllers/deleteMsgController");

router.get("/", homepageController);

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
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Error logging out.");
    }
    res.redirect("/");
  });
});

router.get("/newMsg", (req, res) => {
  res.render("newMsgForm");
});

router.post("/newMsg", messageValidator, newMsgController);

router.get("/loginAdmin", (req, res) => {
  res.render("adminLogin");
});

router.post(
  "/loginAdmin",
  passport.authenticate("admin-login", {
    failureRedirect: "/loginAdmin",
  }),
  adminLoginController
);

router.post("/deleteMessage/:id", deleteMsgController);
module.exports = router;
