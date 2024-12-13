const pool = require("../db/supabase");

const secretFormController = async (req, res) => {
  const user = req.user;
  console.log(user);

  try {
    // Check for
    if (user.membership_status === true) {
      return res.status(400).send("User is already a member");
    }

    user.membership_status = true;
    // Update membership status in the database
    await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [
      true,
      user.id,
    ]);
    res.redirect("/");
    console.log(user.membership_status);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user.");
  }
};

module.exports = {
  secretFormController,
};
