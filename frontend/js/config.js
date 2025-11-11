// API Configuration
// Update this with your EC2 instance IP address when deploying
// Example: const API_BASE_URL = 'http://54.123.45.67:5000/api';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : `http://${window.location.hostname}:5000/api`;

// Alternative: Set this manually for EC2 deployment
// const API_BASE_URL = 'http://YOUR_EC2_IP:5000/api';

console.log('API Base URL:', API_BASE_URL);

export default API_BASE_URL;
