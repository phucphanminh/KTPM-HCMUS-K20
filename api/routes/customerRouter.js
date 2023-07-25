const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/bookings', customerController.createBooking);
router.get('/drivers', customerController.getAvailableDrivers);

module.exports = router;

