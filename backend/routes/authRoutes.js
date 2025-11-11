const express = require('express');
const router = express.Router();
const { signup, login, getUserBookings } = require('../controllers/authController');

// POST /api/auth/signup - User registration
router.post('/signup', signup);

// POST /api/auth/login - User login
router.post('/login', login);

// GET /api/users/:id/bookings - Get user's bookings
router.get('/users/:id/bookings', getUserBookings);

module.exports = router;
