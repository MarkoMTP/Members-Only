const { validationResult } = require("express-validator");
const pool = require("../db/queries");

const newMsgController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    await pool.addNewmessagesToDb(title, content, user.id);
    res.redirect("/");
  } catch (error) {
    console.error("Error creating new message:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the message." });
  }
};

module.exports = {
  newMsgController,
};
