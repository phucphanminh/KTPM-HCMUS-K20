const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

router.get('/bookings', driverController.getNextBooking);
router.post('/bookings/:booking_id', driverController.confirmBooking);
router.post('/bookings/:booking_id/cancel', driverController.cancelBooking);

module.exports = router;
