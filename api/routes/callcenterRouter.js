const express = require('express');
const router = express.Router();
const callcenterController = require('../controllers/callcenterController');

// Route để tạo cuốc xe từ CallCenter
router.post('/bookings', callcenterController.createBooking);

// Route để hủy cuốc xe từ CallCenter
router.post('/bookings/:booking_id/cancel', callcenterController.cancelBooking);

module.exports = router;
