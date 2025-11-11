# 🏨 Hotel Booking System - Full Stack Application

A complete hotel booking system with Node.js/Express.js backend and HTML/CSS/JavaScript frontend, designed for deployment on AWS EC2.

## 📋 Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Local Development Setup](#local-development-setup)
- [AWS EC2 Deployment Guide](#aws-ec2-deployment-guide)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)

## ✨ Features

### Backend Features
- RESTful API with Express.js
- In-memory data storage (no database required)
- CORS enabled for cross-origin requests
- Input validation and error handling
- Environment variable configuration
- Request logging

### Frontend Features
- **Home Page**: Hero section with search functionality and featured packages
- **Packages Page**: Browse all hotels with filtering (location, price, rating)
- **Booking Page**: Complete booking form with validation
- **Dashboard**: View all bookings by email
- Responsive design (mobile, tablet, desktop)
- Real-time price calculation
- Toast notifications
- Loading states

### Pre-loaded Hotel Packages
1. **Paris Luxury Hotel** - $1,299/night ⭐ 4.8
2. **Bali Beach Resort** - $899/night ⭐ 4.7
3. **Tokyo Business Hotel** - $1,099/night ⭐ 4.6
4. **Dubai Premium Suite** - $1,599/night ⭐ 4.9
5. **New York City Hotel** - $1,199/night ⭐ 4.7
6. **London Historic Hotel** - $1,399/night ⭐ 4.8

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS, Body-Parser, dotenv
- **Storage**: In-memory JavaScript arrays

### Frontend
- **HTML5** for structure
- **CSS3** for styling (responsive design)
- **JavaScript (ES6+)** with modules
- **Fetch API** for HTTP requests

## 📁 Project Structure

```
hotel-booking-system/
├── backend/
│   ├── server.js                 # Main server file
│   ├── package.json              # Backend dependencies
│   ├── .env.example              # Environment variables template
│   ├── routes/
│   │   ├── packageRoutes.js      # Package endpoints
│   │   ├── bookingRoutes.js      # Booking endpoints
│   │   └── authRoutes.js         # Authentication endpoints
│   ├── controllers/
│   │   ├── packageController.js  # Package logic & data
│   │   ├── bookingController.js  # Booking logic & data
│   │   └── authController.js     # Auth logic & data
│   └── middleware/
│       └── errorHandler.js       # Error handling middleware
├── frontend/
│   ├── index.html                # Home/Landing page
│   ├── packages.html             # Browse packages page
│   ├── booking.html              # Booking form page
│   ├── dashboard.html            # User dashboard page
│   ├── css/
│   │   └── styles.css            # All CSS styles
│   ├── js/
│   │   ├── config.js             # API configuration
│   │   ├── api.js                # API call functions
│   │   └── main.js               # Utility functions
│   └── assets/
│       └── images/               # Image assets
├── README.md                     # This file
└── .gitignore                    # Git ignore rules
```

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A web browser

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit .env file** (optional - defaults work for local development):
   ```
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=*
   ```

5. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Verify the server is running:**
   - Open: http://localhost:5000
   - You should see API information

### Frontend Setup

1. **Open frontend in browser:**
   - Simply open `frontend/index.html` in your web browser
   - Or use a local server (recommended):
   
   ```bash
   # Using Python 3
   cd frontend
   python3 -m http.server 8080
   ```
   
   ```bash
   # Using Node.js http-server
   npx http-server frontend -p 8080
   ```

2. **Access the application:**
   - Home: http://localhost:8080/index.html
   - The frontend will automatically connect to http://localhost:5000/api

## ☁️ AWS EC2 Deployment Guide

### Step 1: Launch EC2 Instance

1. **Login to AWS Console** and navigate to EC2
2. **Launch Instance**:
   - AMI: Ubuntu 22.04 LTS or Amazon Linux 2
   - Instance Type: t2.micro (free tier eligible)
   - Key Pair: Create or select existing
   - Storage: 8GB (default)

3. **Configure Security Group**:
   - Add inbound rules:
     - SSH: Port 22 (for your IP only)
     - HTTP: Port 80 (0.0.0.0/0)
     - Custom TCP: Port 5000 (0.0.0.0/0) - Backend API
     - Custom TCP: Port 8080 (0.0.0.0/0) - Frontend (optional)

### Step 2: Connect to EC2 Instance

```bash
# SSH into your instance
ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
```

### Step 3: Install Node.js

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js (using NodeSource repository)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 4: Clone Repository

```bash
# Install git if not present
sudo apt install git -y

# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### Step 5: Deploy Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
nano .env
```

**Add to .env file:**
```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=*
```

**Install PM2 (Process Manager):**
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the backend server
pm2 start server.js --name hotel-backend

# Configure PM2 to start on system reboot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs hotel-backend
```

### Step 6: Deploy Frontend

**Option A: Using Python HTTP Server**
```bash
cd ../frontend
python3 -m http.server 80
# Note: May need sudo for port 80
```

**Option B: Using Nginx (Recommended for Production)**
```bash
# Install Nginx
sudo apt install nginx -y

# Copy frontend files to nginx directory
sudo cp -r ../frontend/* /var/www/html/

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 7: Configure Frontend API URL

```bash
# Edit the config.js file
cd /var/www/html/js  # If using Nginx
# OR
cd frontend/js       # If using Python server

nano config.js
```

**Update config.js with your EC2 IP:**
```javascript
// Replace with your actual EC2 public IP
const API_BASE_URL = 'http://YOUR_EC2_PUBLIC_IP:5000/api';
```

### Step 8: Test Your Deployment

1. **Test Backend API:**
   ```bash
   curl http://YOUR_EC2_PUBLIC_IP:5000/api/packages
   ```

2. **Access Frontend:**
   - Open browser: `http://YOUR_EC2_PUBLIC_IP`
   - Test all pages:
     - Home: `http://YOUR_EC2_PUBLIC_IP/index.html`
     - Packages: `http://YOUR_EC2_PUBLIC_IP/packages.html`
     - Booking: `http://YOUR_EC2_PUBLIC_IP/booking.html`
     - Dashboard: `http://YOUR_EC2_PUBLIC_IP/dashboard.html`

### Step 9: Verify Everything Works

1. Browse hotel packages
2. Create a test booking
3. View bookings in dashboard
4. Check PM2 logs for any errors: `pm2 logs hotel-backend`

## 📚 API Documentation

### Base URL
- Local: `http://localhost:5000/api`
- Production: `http://YOUR_EC2_IP:5000/api`

### Endpoints

#### Packages

**GET /api/packages**
- Get all hotel packages
- Query parameters:
  - `location` (optional): Filter by location
  - `minPrice` (optional): Minimum price
  - `maxPrice` (optional): Maximum price
  - `minRating` (optional): Minimum rating

**GET /api/packages/:id**
- Get single package by ID

#### Bookings

**POST /api/bookings**
- Create a new booking
- Body:
  ```json
  {
    "packageId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "checkIn": "2024-12-01",
    "checkOut": "2024-12-05",
    "guests": 2,
    "specialRequests": "Late check-in please"
  }
  ```

**GET /api/bookings**
- Get all bookings
- Query parameters:
  - `email` (optional): Filter by email

**GET /api/bookings/:id**
- Get single booking by ID

#### Authentication (Optional)

**POST /api/auth/signup**
- User registration
- Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

**POST /api/auth/login**
- User login
- Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=*

# JWT Secret (for future authentication enhancement)
JWT_SECRET=your_secret_key_here
```

### Frontend Configuration

Edit `frontend/js/config.js`:

```javascript
// For EC2 deployment, replace with your EC2 public IP
const API_BASE_URL = 'http://YOUR_EC2_IP:5000/api';
```

## 🔧 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Find process using port 5000
sudo lsof -i :5000
# Kill the process
sudo kill -9 PID
```

**PM2 not starting:**
```bash
# Check logs
pm2 logs hotel-backend

# Restart application
pm2 restart hotel-backend

# Delete and restart
pm2 delete hotel-backend
pm2 start server.js --name hotel-backend
```

### Frontend Issues

**API calls failing (CORS errors):**
- Verify backend is running: `pm2 status`
- Check backend logs: `pm2 logs hotel-backend`
- Verify CORS_ORIGIN in .env is set to `*`
- Check EC2 security group allows port 5000

**Can't access frontend:**
- Verify Nginx is running: `sudo systemctl status nginx`
- Check EC2 security group allows port 80
- Verify files are in `/var/www/html/`

### EC2 Security Group

Ensure these ports are open:
- Port 22 (SSH) - Your IP only
- Port 80 (HTTP) - All traffic (0.0.0.0/0)
- Port 5000 (Backend API) - All traffic (0.0.0.0/0)

## 📝 Important Notes

- **Data Persistence**: All data is stored in-memory and will be lost when the server restarts
- **Security**: This is a demo application. In production:
  - Implement proper authentication with JWT
  - Hash passwords using bcrypt
  - Use HTTPS with SSL certificates
  - Implement rate limiting
  - Add input sanitization
  - Use a real database (MongoDB, PostgreSQL, etc.)
- **Scaling**: For production use, consider:
  - Load balancer for multiple EC2 instances
  - Database for persistent storage
  - Redis for session management
  - CloudFront CDN for static assets

## 🎯 Testing the Application

1. **Home Page**: View featured packages and search
2. **Browse Packages**: Filter by location, price, and rating
3. **Create Booking**: Fill out booking form and submit
4. **View Dashboard**: Enter email to see all bookings

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review PM2 logs: `pm2 logs hotel-backend`
- Check browser console for frontend errors
- Verify all ports are open in EC2 security group

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

**Ready for deployment! 🚀**

Made with ❤️ for AWS EC2 deployment