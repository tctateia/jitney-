const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// Ride routes
router.get('/', rideController.getAllRides);
router.post('/', rideController.createRide);

// Route to handle searching for a route
router.post('/searchRoute', rideController.searchRoute);

module.exports = router;
