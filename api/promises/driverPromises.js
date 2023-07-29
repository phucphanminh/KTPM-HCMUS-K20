const db = require('../config.js');

const callAuthenticateDriver = (driverTel, driverPass) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL AuthenticateDriver(?, ?)',
      [driverTel, driverPass],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Lấy dữ liệu từ kết quả của câu SELECT
          console.log(results[0][0]);
          resolve(results[0][0]);
        }
      }
    );
  });
};

const callGetDriver = (driverID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL GetDriver(?)',
      [driverID],
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

const callAddDriver = (
  driverID,
  driverTel,
  driverPass,
  driverName,
  driverAva,
  driverAcc,
  driverVehicleID,
  driverBrandName,
  driverCMND
) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL AddDriver(?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        driverID,
        driverTel,
        driverPass,
        driverName,
        driverAva,
        driverAcc,
        driverVehicleID,
        driverBrandName,
        driverCMND
      ],
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

const callUpdateDriver = (
  driverID, 
  driverTel, 
  driverPass, 
  driverName, 
  driverAva, 
  driverAcc, 
  driverVehicleID, 
  driverBrandName, 
  driverCMND, 
  driverFree
  ) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL UpdateDriver(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        driverID, 
        driverTel, 
        driverPass, 
        driverName, 
        driverAva, 
        driverAcc, 
        driverVehicleID, 
        driverBrandName, 
        driverCMND, 
        driverFree
      ],
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

const callGetRidesByDriverID = (driverID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL GetRidesByDriverID(?)',
      [driverID],
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

const callCompleteRide = (rideID, userID, cusID, driverID, pickupLocation, dropOffLocation, bookTime, price, reservedTime) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL CompleteRide(?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [rideID, userID, cusID, driverID, pickupLocation, dropOffLocation, bookTime, price, reservedTime],
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

module.exports = {
  callAuthenticateDriver,
  callGetDriver,
  callAddDriver,
  callUpdateDriver,
  callGetRidesByDriverID,
  callCompleteRide,
};
