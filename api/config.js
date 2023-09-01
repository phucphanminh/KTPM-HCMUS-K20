const mysql = require('mysql2');
const fs = require('fs');
// const tls = require('tls');

// Đường dẫn tới tệp chứa chứng chỉ SSL
const sslOptions = {
  ca: fs.readFileSync('./ssl/server-ca.pem'),     // Certificate Authority
  key: fs.readFileSync('./ssl/client-key.pem'),  // Client Private Key
  cert: fs.readFileSync('./ssl/client-cert.pem'), // Client Certificate
};

const db = mysql.createConnection({
    host: "35.247.140.34",
    user: "root",
    password: "ktpm-k20-hcmus",
    database: "TAXI",
    // ssl: sslOptions  // Thêm thuộc tính ssl vào đây
});

module.exports = db;
