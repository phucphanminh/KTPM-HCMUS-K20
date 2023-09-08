const CoordinateProviderFactory = require('../CoordinateProviderFactory');
const callcenterPromises = require('../promises/callcenterPromises');
const { Kafka } = require('kafkajs');

const gpsHistory = async (req, res) => {
  const { phoneNumber, pickupAddress } = req.body;
  // console.log(req.body);
  try {
    const result = await callcenterPromises.gpsHistory(phoneNumber, pickupAddress);
    // if (result && result.length > 0) {
        // result không trống, và có ít nhất một phần tử trong mảng (hoặc có giá trị)
        return res.json(result);
      // } else {
      //   // result trống
      //   const providerType = req.body.coordinateProviderType;
      //   const factory = new CoordinateProviderFactory();
      //   const provider = factory.createProvider(providerType);
      //   const coordinate = provider.getCoordinateResponse(pickupAddress);
      //   console.log(coordinate);
      //   return res.json(coordinate);
        
      //   // return res.json(coordinate);
      //   // return res.status(404).json({ error: 'Không tìm thấy dữ liệu GPS.' });
      // }
    } catch (error) {
    // console.error(error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy lịch sử GPS.' });
  }
};

const saveGPS = async (req, res) => {
  const { ID,  phoneNumber, pickupAddress, latitude, longitude } = req.body;

  try {
    const result = await callcenterPromises.saveGPS(ID,  phoneNumber, pickupAddress, latitude, longitude);
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
  createBooking,
  cancelBooking,
};