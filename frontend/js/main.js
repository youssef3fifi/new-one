// Utility functions

// Show toast notification
export function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Show loading spinner
export function showLoading(container) {
  container.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  `;
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Format date
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Validate email
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Local storage helpers
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Get user from localStorage
export function getCurrentUser() {
  return storage.get('user');
}

// Save user to localStorage
export function saveUser(user, token) {
  storage.set('user', user);
  storage.set('token', token);
}

// Logout user
export function logoutUser() {
  storage.remove('user');
  storage.remove('token');
  window.location.href = 'index.html';
}

// Update navigation based on login status
export function updateNavigation() {
  const user = getCurrentUser();
  const authLinks = document.getElementById('auth-links');
  
  if (authLinks) {
    if (user) {
      authLinks.innerHTML = `
        <a href="dashboard.html">Dashboard</a>
        <a href="#" onclick="logoutUser()">Logout (${user.name})</a>
      `;
    } else {
      authLinks.innerHTML = `
        <a href="#" onclick="showAuthModal('login')">Login</a>
        <a href="#" onclick="showAuthModal('signup')">Sign Up</a>
      `;
    }
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateNavigation();
});
