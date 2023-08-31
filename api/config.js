const mysql = require('promise-mysql');
const fs = require('fs');

// Đường dẫn tới tệp chứa chứng chỉ SSL
const sslOptions = {
  ca: fs.readFileSync('./ssl/server-ca.pem'),     // Certificate Authority
  key: fs.readFileSync('./ssl/client-key.pem'),  // Client Private Key
  cert: fs.readFileSync('./ssl/client-cert.pem'), // Client Certificate
  rejectUnauthorized: true
};

// createTcpPool initializes a TCP connection pool for a Cloud SQL
// instance of MySQL.
const createTcpPool = async config => {
  const dbConfig = {
    host: '35.247.140.34',
    user: 'root',
    password: 'ktpm-k20-hcmus',
    database: 'TAXI',
    ...config
  };

  // (TÙY CHỌN) Cấu hình chứng chỉ SSL
  // Đối với các phiên bản triển khai kết nối trực tiếp tới Cloud SQL instance
  // mà không sử dụng Cloud SQL Proxy, cấu hình chứng chỉ SSL sẽ đảm bảo kết nối được mã hóa.
  if (process.env.DB_ROOT_CERT) {
    dbConfig.ssl = {
      sslmode: 'verify-full',
      ca: fs.readFileSync('./ssl/server-ca.pem'), // Thay đổi thành đường dẫn thích hợp
      key: fs.readFileSync('./ssl/client-key.pem'), // Thay đổi thành đường dẫn thích hợp
      cert: fs.readFileSync('./ssl/client-cert.pem'), // Thay đổi thành đường dẫn thích hợp
    };
  }

  // Khởi tạo kết nối đến cơ sở dữ liệu.
  return mysql.createPool(dbConfig);
};

module.exports = createTcpPool;
