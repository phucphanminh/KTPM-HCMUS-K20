const db = require('../config.js');

const callAuthenticateDriver = async (driverTel, driverPass) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.AuthenticateDriver($1, $2)',
      [driverTel, driverPass],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]);
        }
      }
    );
  });
};

const callGetDriver = async (driverID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.GetDriver($1)',
      [driverID],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

const callAddDriver = async (
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
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.AddDriver($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
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
          resolve(results.rows[0]);
        }
      }
    );
  });
};

const callUpdateDriver = async (
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
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.UpdateDriver($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
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
          resolve(results.rows[0]);
        }
      }
    );
  });
};

const callGetRidesByDriverID = async (driverID) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.GetRidesByDriverID($1)',
      [driverID],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

const callCompleteRide = async (rideID, userID, cusID, driverID, pickupLocation, dropOffLocation, bookTime, price, reservedTime) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.CompleteRide($1, $2, $3, $4, $5, $6, $7, $8, $9);',
      [rideID, userID, cusID, driverID, pickupLocation, dropOffLocation, bookTime, price, reservedTime],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]);
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
