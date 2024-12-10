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

const addNewmessagesToDb = async function (title, text, userId) {
  const result = await pool.query(
    "INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3) ",
    [title, text, userId]
  );

  return result.rows;
};

const getAllmessages = async function () {
  const results = await pool.query(
    "SELECT messages.title, messages.text, messages.created_at, users.full_name, users.isadmin  FROM messages    JOIN users ON messages.user_id = users.id; "
  );
  return results.rows;
};
module.exports = {
  getAllmessages,
  findUserEmail,
  addUserToDb,
  addNewmessagesToDb,
};
