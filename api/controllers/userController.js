const db = require ('../config.js');

const userInfor = (req, res) => {
  // Xử lý lấy thông tin khách hàng
  // ...
};

const userInforUpdate = (req, res) => {
  // Xử lý cập nhật thông tin khách hàng
  // ...
};

const userRides = (req, res) => {
  // Xử lý lịch sử di chuyển khách hàng
  // ...
};

const createBooking = (req, res) => {
  // Xử lý tạo cuốc xe từ App Khách Hàng
  // ...
};

const getAvailableDrivers = (req, res) => {
  // Xử lý lấy danh sách tài xế hiện có
  // ...
};

const cancelBooking = (req, res) => {
  // Xử lý hủy cuốc xe từ App Khách Hàng
  // ...
};

module.exports = {
  userInfor,
  userInforUpdate,
  userRides,
  createBooking,
  getAvailableDrivers,
  cancelBooking,
};
