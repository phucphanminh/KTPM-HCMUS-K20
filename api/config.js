const { Pool } = require('pg');

// const db = mysql.createConnection({
//     host: "35.247.140.34",
//     user: "root",
//     password: "ktpm-k20-hcmus",
//     database: "TAXI",
// });

const db = new Pool({
  connectionString: "postgresql://postgres:EZsBnmxP4lnMJfk3@db.jucbnsrgkemvtuhkrvzk.supabase.co:5432/postgres",
});


module.exports = db;
