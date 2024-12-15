const supabasePool = require("./supabase");

const findUserEmail = async function (email) {
  const result = await supabasePool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows;
};

const addUserToDb = async function (
  full_name,
  email,
  password,
  membership_status
) {
  await supabasePool.query(
    "INSERT INTO users (full_name, email, password, membership_status) VALUES ($1, $2, $3, $4) ",
    [full_name, email, password, (membership_status = false)]
  );
};

const addNewmessagesToDb = async function (title, text, userId) {
  const result = await supabasePool.query(
    "INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3) ",
    [title, text, userId]
  );

  return result.rows;
};

const getAllmessages = async function () {
  const results = await supabasePool.query(`
    SELECT 
      messages.id, 
      messages.title, 
      messages.text, 
      messages.created_at, 
      users.full_name, 
      users.isadmin  
    FROM messages
    JOIN users ON messages.user_id = users.id;
  `);
  return results.rows;
};

const deleteMsg = async function (id) {
  await supabasePool.query("DELETE  FROM messages WHERE id = $1", [id]);
};
module.exports = {
  getAllmessages,
  deleteMsg,
  findUserEmail,
  addUserToDb,
  addNewmessagesToDb,
};
