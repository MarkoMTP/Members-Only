const express = require("express");
const session = require("express-session");
let passport = require("passport");
let crypto = require("crypto");
const routes = require("./routes");
const pool = require("./db/supabase");
let app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pgSession = require("connect-pg-simple")(session);

app.use(
  session({
    store: new pgSession({
      pool: pool, // PostgreSQL connection pool
      tableName: "session", // The table you imported earlier
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "supersecret", // Secret to sign cookies
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
