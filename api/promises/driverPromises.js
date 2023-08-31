const createTcpPool = require('../config.js'); 

const callAuthenticateDriver = async (driverTel, driverPass) => {
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
      'CALL AuthenticateDriver(?, ?)',
      [driverTel, driverPass],
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

const callGetDriver = async (driverID) => {
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
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

const callAddDriver = async (
  driverID,
  driverTel,
  driverPass,
  driverName,
  driverAva,
  driverAcc,
  driverVehicleID,
  driverVehicleType,
  driverBrandName,
  driverCMND
) => {
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
      'CALL AddDriver(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        driverID,
        driverTel,
        driverPass,
        driverName,
        driverAva,
        driverAcc,
        driverVehicleID,
        driverVehicleType,
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

const callUpdateDriver = async (
  driverID, 
  driverTel, 
  driverPass, 
  driverName, 
  driverAva, 
  driverAcc, 
  driverVehicleID, 
  driverVehicleType,
  driverBrandName, 
  driverCMND, 
  driverFree
) => {
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
      'CALL UpdateDriver(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        driverID, 
        driverTel, 
        driverPass, 
        driverName, 
        driverAva, 
        driverAcc, 
        driverVehicleID, 
        driverVehicleType,
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

const callGetRidesByDriverID = async (driverID) => {
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
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

const callCompleteRide = async (rideID, userID, cusID, driverID, pickupLocation, dropOffLocation, bookTime, price, reservedTime) => {
  const pool = await createTcpPool();
  return new Promise((resolve, reject) => {
    pool.query(
      'CALL CompleteRide(?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [rideID, userID, cusID, driverID, pickupLocation, dropOffLocation, bookTime, price, reservedTime],
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

module.exports = {
  callAuthenticateDriver,
  callGetDriver,
  callAddDriver,
  callUpdateDriver,
  callGetRidesByDriverID,
  callCompleteRide,
};
