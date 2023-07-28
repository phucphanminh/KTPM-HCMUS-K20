const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route để lấy thông tin khách hàng
router.get('/user-info', userController.userInfor);

// Route để cập nhật thông tin khách hàng
router.put('/user-info/update', userController.userInforUpdate);

// Route để lấy lịch sử di chuyển khách hàng
router.get('/user-rides', userController.userRides);

// Route để tạo cuốc xe từ App Khách Hàng
router.post('/bookings', userController.createBooking);

// Route để lấy danh sách tài xế hiện có
router.get('/available-drivers', userController.getAvailableDrivers);

// Route để hủy cuốc xe từ App Khách Hàng
router.post('/bookings/:booking_id/cancel', userController.cancelBooking);

module.exports = router;