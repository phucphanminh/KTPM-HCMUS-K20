const createTcpPool = require('../config.js'); 

const callAuthenticateUser = async (userTel, userPass) => {
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
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
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
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
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
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
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
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
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
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
