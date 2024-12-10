const pool = require("../db/queries");

const deleteMsgController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res.status(404).json({ error: "Message Not Found" });
    }

    await pool.deleteMsg(id);
    console.log("Message Deleted");
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting a message:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the message." });
  }
};

module.exports = { deleteMsgController };
