const { Pool } = require('pg');

const db = new Pool({
  connectionString: "postgresql://postgres:EZsBnmxP4lnMJfk3@db.jucbnsrgkemvtuhkrvzk.supabase.co:5432/postgres",
});


module.exports = db;
