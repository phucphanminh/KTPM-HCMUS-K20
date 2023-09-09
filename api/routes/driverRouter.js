const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Route để xác thực tài xế
router.post('/login', driverController.login);                              //
// {
//     "result": "D2" --> ID
// }

// Route để lấy thông tin tài xế
router.get('/driver-info/:driver_id', driverController.driverInfor);        //
// {
//     "ID": "D2",
//     "TEL": "2222222222",
//     "PASS": "4420e33a9d750d6aa50e7fa57cb0037b68ab9970f78f2c177f3e34716e183ee8",
//     "NAME": "William Martinez",
//     "AVA": "D2.png",
//     "ACC": "3150782496",
//     "VEHICLEID": "36G8-67890",
//     "VEHICLETYPE": "Car 7 seats",
//     "BRANDNAME": "Mercedes-Benz E-Class",
//     "CMND": "034567890109",
//     "FREE": 1
// }

// Route để thêm tài xế
router.post('/add-driver', driverController.driverAdd);                     //

// Route để cập nhật thông tin tài xế
router.put('/driver-info/update', driverController.driverInforUpdate);      //

// Route để lấy lịch sử di chuyển của tài xế
router.get('/driver-rides/:driver_id', driverController.driverRides);       //
// {
//     "ID": "R10",
//     "USE_ID": "0345678901",
//     "CUS_ID": null,
//     "DRI_ID": "D2",
//     "PICKUP": "BHD Star Cineplex Vincom Quang Trung",
//     "DROPOFF": "Đại học Sư phạm",
//     "STATUS": 0,
//     "BOOKTIME": "2023-07-27T06:15:00.000Z",
//     "PRICE": 230000,
//     "RESERVEDTIME": "2023-07-27T04:30:00.000Z"
// }

// Route để lấy thông tin cuốc đặt tiếp theo của tài xế
router.get('/next-booking', driverController.getNextBooking);

// Route để xác nhận cuốc đặt từ tài xế
router.put('/bookings/:booking_id/confirm', driverController.confirmBooking);

// Route để hoàn thành cuốc đặt từ tài xế
router.post('/bookings/process', driverController.processRide);  

// Route để hoàn tất cuốc đặt từ tài xế
router.post('/bookings/complete/:ride_id', driverController.completeRide);  

// Route để hủy cuốc đặt từ tài xế
router.post('/bookings/cancel/:ride_id', driverController.cancelRide);  

module.exports = router;
