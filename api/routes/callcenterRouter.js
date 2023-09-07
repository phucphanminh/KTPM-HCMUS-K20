const express = require('express');
const router = express.Router();
const callCenterController = require('../controllers/callCenterController');

// Route để lấy lịch sử GPS từ CallCenter
router.post('/customer', callCenterController.gpsHistory);

// Route để lưu lịch sử GPS từ CallCenter
router.post('/save', callCenterController.saveGPS);

// Route để tạo cuốc xe từ CallCenter
router.post('/bookings', callCenterController.createBooking);

// Route để hủy cuốc xe từ CallCenter
router.post('/bookings/:booking_id/cancel', callCenterController.cancelBooking);

module.exports = router;
