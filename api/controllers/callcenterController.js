const callcenterPromises = require('../promises/callcenterPromises');

const gpsHistory = async (req, res) => {
  const { phoneNumber, pickupAddress } = req.body;
  // console.log(req.body);
  try {
    const result = await callcenterPromises.gpsHistory(phoneNumber, pickupAddress);
      return res.json(result);
    } catch (error) {
    // console.error(error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy lịch sử GPS.' });
  }
};

const saveGPS = async (req, res) => {
  const { ID,  phoneNumber, pickupAddress, latitude, longitude } = req.body;
  // console.log(req.body);
  try {
    const result = await callcenterPromises.saveGPS(ID,  phoneNumber, pickupAddress, latitude, longitude);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lưu lịch sử GPS.' });
  }
};

const customerAdd = async (req, res) => {
  const { ID,  phoneNumber, name } = req.body;
  // console.log(req.body);
  try {
    const result = await callcenterPromises.callAddCustomer(ID,  phoneNumber, name);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lưu lịch sử GPS.' });
  }
};

const createBooking = (req, res) => {
  // Xử lý tạo cuốc xe từ CallCenter
  // ...
};

const cancelBooking = (req, res) => {
  // Xử lý hủy cuốc xe từ CallCenter
  // ...
};

module.exports = {
  gpsHistory,
  saveGPS,
  customerAdd,
  createBooking,
  cancelBooking,
};