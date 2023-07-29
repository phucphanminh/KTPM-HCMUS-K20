const db = require('../config.js');

const callGetUser = (userTel) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL GetUser(?)',
      [userTel],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

const callAddUser = (userTel, userPass, userName, userAva, userVIP) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL AddUser(?, ?, ?, ?, ?)',
      [userTel, userPass, userName, userAva, userVIP],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0][0]);
        }
      }
    );
  });
};

const callUpdateUser = (userTel, userPass, userName, userAva, userVIP) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL UpdateUser(?, ?, ?, ?, ?); SELECT "Cập nhật thông tin thành công" AS message;',
      [userTel, userPass, userName, userAva, userVIP],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Lấy dữ liệu từ kết quả của câu SELECT
          resolve(results[0][0]);
        }
      }
    );
  });
};

const callGetRidesByUserID = (userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL GetRidesByUserID(?)',
      [userID],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

module.exports = {
  callGetUser,
  callAddUser,
  callUpdateUser,
  callGetRidesByUserID,
};
