const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Route để lấy thông tin tài xế
router.get('/driver-info/:driver_id', driverController.driverInfor);        //

// Route để thêm tài xế
router.post('/add-driver', driverController.driverAdd);                     //

// Route để cập nhật thông tin tài xế
router.put('/driver-info/update', driverController.driverInforUpdate);      //

// Route để lấy lịch sử di chuyển của tài xế
router.get('/driver-rides/:driver_id', driverController.driverRides);       //

// Route để lấy thông tin cuốc đặt tiếp theo của tài xế
router.get('/next-booking', driverController.getNextBooking);

// Route để xác nhận cuốc đặt từ tài xế
router.put('/bookings/:booking_id/confirm', driverController.confirmBooking);

// Route để hủy cuốc đặt từ tài xế
router.put('/bookings/:booking_id/cancel', driverController.cancelBooking);

// Route để hoàn thành cuốc đặt từ tài xế
router.post('/bookings/:ride_id/complete', driverController.completeRide);  //

module.exports = router;
