const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route để xác thực khách hàng
router.post('/login', userController.login);                        //
// {
//     "result": "0123456789" --> TEL
// }

// Route để lấy thông tin khách hàng
router.get('/user-info/:user_tel', userController.userInfor);       //
// {
//     "TEL": "0234567890",
//     "PASS": "Random_Password_2",
//     "NAME": "Mia Garcia",
//     "AVA": "U2.png",
//     "VIP": 0
// }

// Route để thêm khách hàng
router.post('/add-user', userController.userAdd);                   //  

// Route để cập nhật thông tin khách hàng
router.put('/user-info/update', userController.userInforUpdate);    //

// Route để lấy lịch sử di chuyển khách hàng
router.get('/user-rides/:user_id', userController.userRides);       //
// {
//     "ID": "R1",
//     "USE_ID": "0234567890",
//     "CUS_ID": null,
//     "DRI_ID": "D2",
//     "PICKUP": "Chợ Bến Thành",
//     "DROPOFF": "Chùa Vĩnh Nghiêm",
//     "STATUS": 1,
//     "BOOKTIME": "2023-07-26T05:34:56.000Z",
//     "PRICE": 210000,
//     "RESERVEDTIME": "2023-07-26T03:00:00.000Z"
// }

// Route để hủy cuốc đặt từ khách hàng
router.post('/bookings/cancel/:ride_id', userController.cancelRide);  

module.exports = router;