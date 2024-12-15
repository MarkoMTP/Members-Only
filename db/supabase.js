require("dotenv").config(); // Load .env variables
const { Pool } = require("pg");

const supabasePool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = supabasePool;
