const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { findUserEmail, addUserToDb } = require("../db/queries"); // Adjust the path to your queries file

// Handle user registration
const registerController = async (req, res) => {
  const { full_name, email, password } = req.body;

  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check for duplicate email
    const result = await findUserEmail(email);
    if (result.length > 0) {
      return res.status(400).send("Email is already registered");
    }

    // Hash the password and add the user to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    await addUserToDb(full_name, email, hashedPassword);
    res.send("GOOD REG");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user.");
  }
};

module.exports = {
  registerController,
};
