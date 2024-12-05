const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("../db/pool");

passport.use(
  "user-login",
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (result.rows.length === 0) {
        return done(null, false, { message: "Incorrect username." }); // No user found
      }

      const user = result.rows[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  })
);

passport.use(
  "club-passcode",
  new LocalStrategy(
    {
      usernameField: "full_name",
      passwordField: "secret_password",
      session: false,
    },
    async (username, password, done) => {
      try {
        const result = await pool.query(
          "SELECT * FROM users WHERE full_name = $1",
          [username]
        );

        // Check if user exists
        if (result.rows.length === 0) {
          return done(null, false, { message: "Incorrect username." });
        }

        const user = result.rows[0];

        // Check if the provided password matches the secret passcode
        const secretPass = process.env.SECRET_PASS;
        if (password === secretPass) {
          return done(null, user, { message: "Access granted" });
        }

        // If the password doesn't match
        return done(null, false, { message: "Invalid password" });
      } catch (err) {
        console.error("Error in Passport strategy:", err);
        return done(err); // Pass the error to Passport
      }
    }
  )
);

//serilize user, put him in session

passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserialize, or fetch the user data from db
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return done(new Error("User not found"));
    }

    const user = result.rows[0];
    done(null, user); // Attach user object to `req.user`
  } catch (err) {
    console.error(err);
    done(err, null); // Handle errors
  }
});
module.exports = passport;
