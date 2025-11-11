import API_BASE_URL from './config.js';

// Helper function to handle API calls
async function apiCall(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`API Call: ${options.method || 'GET'} ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Package API calls
export const packagesAPI = {
  // Get all packages with optional filters
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    const queryString = params.toString();
    return apiCall(`/packages${queryString ? '?' + queryString : ''}`);
  },
  
  // Get single package by ID
  getById: (id) => {
    return apiCall(`/packages/${id}`);
  }
};

// Booking API calls
export const bookingsAPI = {
  // Create a new booking
  create: (bookingData) => {
    return apiCall('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },
  
  // Get all bookings (optionally filter by email)
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    const queryString = params.toString();
    return apiCall(`/bookings${queryString ? '?' + queryString : ''}`);
  },
  
  // Get single booking by ID
  getById: (id) => {
    return apiCall(`/bookings/${id}`);
  }
};

// Auth API calls
export const authAPI = {
  // User signup
  signup: (userData) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  
  // User login
  login: (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },
  
  // Get user bookings
  getUserBookings: (userId) => {
    return apiCall(`/users/${userId}/bookings`);
  }
};

// Export default for convenience
export default {
  packages: packagesAPI,
  bookings: bookingsAPI,
  auth: authAPI
};
