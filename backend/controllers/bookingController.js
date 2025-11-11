// In-memory storage for bookings
let bookings = [];
let bookingIdCounter = 1;

// Create a new booking
const createBooking = (req, res) => {
  try {
    const { packageId, name, email, phone, checkIn, checkOut, guests, specialRequests } = req.body;
    
    // Validation
    if (!packageId || !name || !email || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: packageId, name, email, checkIn, checkOut, guests'
      });
    }
    
    // Email validation - using simple check to avoid ReDoS
    // More robust validation can be done with libraries like validator.js in production
    if (!email || !email.includes('@') || !email.includes('.') || email.length > 254) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Date validation
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past'
      });
    }
    
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date'
      });
    }
    
    // Guests validation
    if (guests < 1 || guests > 10) {
      return res.status(400).json({
        success: false,
        message: 'Number of guests must be between 1 and 10'
      });
    }
    
    // Create booking
    const newBooking = {
      id: bookingIdCounter++,
      packageId: parseInt(packageId),
      name,
      email,
      phone: phone || '',
      checkIn,
      checkOut,
      guests: parseInt(guests),
      specialRequests: specialRequests || '',
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      userId: req.userId || null // For future authentication
    };
    
    bookings.push(newBooking);
    
    console.log(`New booking created: ID ${newBooking.id}, Package ${packageId}, ${name}`);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// Get all bookings
const getAllBookings = (req, res) => {
  try {
    // Optional: Filter by email or userId
    const { email, userId } = req.query;
    
    let filteredBookings = [...bookings];
    
    if (email) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.email.toLowerCase() === email.toLowerCase()
      );
    }
    
    if (userId) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.userId === parseInt(userId)
      );
    }
    
    res.status(200).json({
      success: true,
      count: filteredBookings.length,
      data: filteredBookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// Get booking by ID
const getBookingById = (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);
    const booking = bookings.find(b => b.id === bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById
};
