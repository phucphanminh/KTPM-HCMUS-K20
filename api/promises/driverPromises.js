// Trong driverPromises.js
const db = require('../config.js');

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

module.exports = {
  callGetRidesByDriverID,
  
};
