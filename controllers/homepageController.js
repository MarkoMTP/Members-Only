const pool = require("../db/queries");

const homepageController = async (req, res) => {
  try {
    const messages = await pool.getAllmessages();

    res.render("homepage", {
      user: req.user,
      messages: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching messages." });
  }
};

module.exports = {
  homepageController,
};
