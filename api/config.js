const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "35.247.140.34",
    user: "root",
    password: "ktpm-k20-hcmus",
    database: "taxi",
});

module.exports = db;