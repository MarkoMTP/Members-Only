require("dotenv").config(); // Load .env variables
const { Pool } = require("pg");

const supabasePool = new Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
});

module.exports = supabasePool;
