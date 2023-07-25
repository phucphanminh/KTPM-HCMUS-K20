const express = require('express');
const router = express.Router();
const callcenterController = require('../controllers/callcenterController');

router.post('/bookings', callcenterController.createBooking);

module.exports = router;
