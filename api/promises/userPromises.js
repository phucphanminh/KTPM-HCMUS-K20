const db = require('../config.js');

const callAuthenticateUser = (userTel, userPass) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL AuthenticateUser(?, ?)',
      [userTel, userPass],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Lấy dữ liệu từ kết quả của câu SELECT
          // console.log(results[0][0]);
          resolve(results[0][0]);
        }
      }
    );
  });
};

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

const callAddUser = (userTel, userPass, userName, userAva) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL AddUser(?, ?, ?, ?)',
      [userTel, userPass, userName, userAva],
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
      'CALL UpdateUser(?, ?, ?, ?, ?)',
      [userTel, userPass, userName, userAva, userVIP],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Trả về kết quả từ stored procedure
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
  callAuthenticateUser,
  callGetUser,
  callAddUser,
  callUpdateUser,
  callGetRidesByUserID,
};
