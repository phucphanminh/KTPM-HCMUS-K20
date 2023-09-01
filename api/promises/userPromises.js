const db = require('../config.js'); 

const callAuthenticateUser = async (userTel, userPass) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL AuthenticateUser(?, ?)',
      [userTel, userPass],
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

const callGetUser = async (userTel) => {
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

const callAddUser = async (userTel, userPass, userName, userAva) => {
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

const callUpdateUser = async (userTel, userPass, userName, userAva, userVIP) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL UpdateUser(?, ?, ?, ?, ?)',
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

const callGetRidesByUserID = async (userID) => {
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
