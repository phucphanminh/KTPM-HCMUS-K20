const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Route để lấy thông tin tài xế
router.get('/driver-info', driverController.driverInfor);

// Route để cập nhật thông tin tài xế
router.put('/driver-info/update', driverController.driverInforUpdate);

// Route để lấy lịch sử di chuyển của tài xế
router.get('/driver-rides/:driver_id', driverController.driverRides);

// Route để lấy thông tin cuốc đặt tiếp theo của tài xế
router.get('/next-booking', driverController.getNextBooking);

// Route để xác nhận cuốc đặt từ tài xế
router.post('/bookings/:booking_id/confirm', driverController.confirmBooking);

// Route để hủy cuốc đặt từ tài xế
router.post('/bookings/:booking_id/cancel', driverController.cancelBooking);

module.exports = router;
