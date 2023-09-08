const db = require('../config.js');

const gpsHistory = async (phoneNumber, pickupAddress) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.Find_GPS_History($1, $2)',
      [phoneNumber, pickupAddress],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]); // Lấy kết quả đầu tiên
        }
      }
    );
  });
};

const saveGPS = async (ID,  phoneNumber, pickupAddress, latitude, longitude) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM TAXI.Save_GPS_History($1, $2, $3, $4, $5)',
      [ID,  phoneNumber, pickupAddress, latitude, longitude],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]); // Lấy kết quả đầu tiên
        }
      }
    );
  });
};

module.exports = {
  gpsHistory,
  saveGPS,
};