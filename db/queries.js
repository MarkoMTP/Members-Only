const pool = require("./pool");

const findUserEmail = async function (email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows;
};

const addUserToDb = async function (
  full_name,
  email,
  password,
  membership_status
) {
  await pool.query(
    "INSERT INTO users (full_name, email, password, membership_status) VALUES ($1, $2, $3, $4) ",
    [full_name, email, password, (membership_status = false)]
  );
};

const addNewMsgToDb = async function (title, text, userId) {
  await pool.query(
    "INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3) ",
    [title, text, userId]
  );
};
module.exports = { findUserEmail, addUserToDb, addNewMsgToDb };
