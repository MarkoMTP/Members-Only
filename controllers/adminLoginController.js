const pool = require("../db/pool");

const adminLoginController = async (req, res) => {
  const user = req.user;

  try {
    // Check if the user is already an admin
    if (user.isAdmin === true) {
      return res.status(409).json({ error: "User is already an admin." });
    }

    // Update admin status in the database
    await pool.query("UPDATE users SET isAdmin = $1 WHERE id = $2", [
      true,
      user.id,
    ]);

    // Redirect to admin dashboard or another meaningful route
    res.redirect("/");
  } catch (err) {
    console.error("Error promoting user to admin:", err);
    res
      .status(500)
      .json({ error: "An error occurred while making the user an admin." });
  }
};

module.exports = {
  adminLoginController,
};

module.exports = {
  adminLoginController,
};
