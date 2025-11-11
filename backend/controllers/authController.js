// In-memory storage for users
let users = [];
let userIdCounter = 1;

// User signup
const signup = (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, password'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Create new user (Note: In production, hash the password!)
    const newUser = {
      id: userIdCounter++,
      name,
      email: email.toLowerCase(),
      password, // WARNING: In production, use bcrypt to hash passwords!
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    console.log(`New user registered: ${email}`);
    
    // Don't send password back to client
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userWithoutPassword,
        // In production, generate and return JWT token here
        token: `mock_token_${newUser.id}`
      }
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({
      success: false,
      message: 'Error during signup',
      error: error.message
    });
  }
};

// User login
const login = (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, password'
      });
    }
    
    // Find user
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check password (Note: In production, use bcrypt to compare hashed passwords!)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    console.log(`User logged in: ${email}`);
    
    // Don't send password back to client
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        // In production, generate and return JWT token here
        token: `mock_token_${user.id}`
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

// Get user bookings
const getUserBookings = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Import bookings from bookingController (in real app, use database)
    // For now, we'll send empty array - frontend can use email-based queries
    
    res.status(200).json({
      success: true,
      message: 'Use GET /api/bookings?email=YOUR_EMAIL to fetch bookings',
      data: []
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user bookings',
      error: error.message
    });
  }
};

module.exports = {
  signup,
  login,
  getUserBookings
};
