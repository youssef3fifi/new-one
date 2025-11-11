const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, getBookingById } = require('../controllers/bookingController');

// POST /api/bookings - Create a new booking
router.post('/', createBooking);

// GET /api/bookings - Get all bookings (with optional filters)
router.get('/', getAllBookings);

// GET /api/bookings/:id - Get single booking by ID
router.get('/:id', getBookingById);

module.exports = router;
