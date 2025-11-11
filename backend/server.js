const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');

// Import middleware
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Configuration
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hotel Booking API is running',
    version: '1.0.0',
    endpoints: {
      packages: '/api/packages',
      bookings: '/api/bookings',
      auth: '/api/auth'
    }
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hotel Booking API v1.0.0',
    endpoints: {
      packages: {
        getAll: 'GET /api/packages',
        getById: 'GET /api/packages/:id'
      },
      bookings: {
        create: 'POST /api/bookings',
        getAll: 'GET /api/bookings',
        getById: 'GET /api/bookings/:id'
      },
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        getUserBookings: 'GET /api/users/:id/bookings'
      }
    }
  });
});

// API Routes
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🏨 Hotel Booking System Backend Server');
  console.log('='.repeat(50));
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Local: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`🔒 CORS Origin: ${CORS_ORIGIN}`);
  console.log('='.repeat(50));
  console.log('📋 Available endpoints:');
  console.log('   GET  /api/packages');
  console.log('   GET  /api/packages/:id');
  console.log('   POST /api/bookings');
  console.log('   GET  /api/bookings');
  console.log('   POST /api/auth/signup');
  console.log('   POST /api/auth/login');
  console.log('='.repeat(50));
});

module.exports = app;
