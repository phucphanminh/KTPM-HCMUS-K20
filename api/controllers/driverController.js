const driverPromises = require('../promises/driverPromises.js');

const login = async (req, res) => {
  const { driverTel, driverPass } = req.body;

  try {
    const result = await driverPromises.callAuthenticateDriver(driverTel, driverPass);
    return res.status(200).json({ result: result.result });
  } catch (error) {
    console.error('Lỗi khi xác thực tài xế:', error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi xác thực tài xế.' });
  }
};

const driverInfor = async (req, res) => {
  const driverID = req.params.driver_id;

  try {
    const driver = await driverPromises.callGetDriver(driverID);
    console.log(driver);
    return res.json(driver);
  } catch (error) {
    console.error('Lỗi khi gọi stored procedure:', error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin tài xế.' });
  }
};

const driverAdd = async (req, res) => {
  const {
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
  } = req.body;

  try {
    const result = await driverPromises.callAddDriver(
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
    );

    // Trả về thông báo thành công
    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error('Lỗi khi thêm tài xế:', error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm tài xế.' });
  }
};

const driverInforUpdate = async (req, res) => {
  const { 
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
  } = req.body;

  try {
    const result = await driverPromises.callUpdateDriver(
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
      );
    return res.json({ message: result.message });
  } catch (error) {
    console.error('Lỗi khi gọi stored procedure:', error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin tài xế.' });
  }
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

const completeRide = async (req, res) => {
  const { rideID, userID, cusID, driverID, pickupLocation, dropOffLocation, bookTime, price, reservedTime } = req.body;

  try {
    const result = await driverPromises.callCompleteRide(rideID, userID, cusID, driverID, pickupLocation, dropOffLocation, bookTime, price, reservedTime);
    return res.json({ message: result.message });
  } catch (error) {
    console.error('Lỗi khi gọi stored procedure:', error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm cuốc xe.' });
  }
};

module.exports = {
  login,
  driverInfor,
  driverAdd,
  driverInforUpdate,
  driverRides,
  getNextBooking,
  confirmBooking,
  cancelBooking,
  completeRide,
};