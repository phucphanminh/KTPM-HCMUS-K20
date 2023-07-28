const driverPromises = require('../promises/driverPromises.js');

const driverInfor = (req, res) => {
  // Xử lý lấy thông tin tài xế
  // ...
};

const driverInforUpdate = (req, res) => {
  // Xử lý cập nhật thông tin tài xế
  // ...
};

const driverRides = async (req, res) => {
  const driverID  = req.params.driver_id;
  // console.log(driverID);
  try {
    const rides = await driverPromises.callGetRidesByDriverID(driverID);
    console.log(rides);
    return res.json(rides);
  } catch (error) {
    console.error('Lỗi khi gọi stored procedure:', error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy lịch sử di chuyển tài xế.' });
  }
};

const getNextBooking = (req, res) => {
  // Xử lý lấy thông tin cuốc đặt tiếp theo cho tài xế
  // ...
};

const confirmBooking = (req, res) => {
  // Xử lý xác nhận cuốc đặt từ tài xế
  // ...
};

const cancelBooking = (req, res) => {
  // Xử lý hủy cuốc đặt từ tài xế
  // ...
};

module.exports = {
  driverInfor,
  driverInforUpdate,
  driverRides,
  getNextBooking,
  confirmBooking,
  cancelBooking,
};