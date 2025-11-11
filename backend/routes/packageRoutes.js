const express = require('express');
const router = express.Router();
const { getAllPackages, getPackageById } = require('../controllers/packageController');

// GET /api/packages - Get all packages with optional filters
router.get('/', getAllPackages);

// GET /api/packages/:id - Get single package by ID
router.get('/:id', getPackageById);

module.exports = router;
