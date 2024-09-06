const axios = require('axios');
const Ride = require('../models/Ride');
const rides = [];  // Simulating a database

// Controller to get all rides
exports.getAllRides = (req, res) => {
    try {
        res.render('rides', { rides });
    } catch (error) {
        console.error('Error fetching rides:', error);
        res.status(500).send('Server Error');
    }
};

// Controller to create a new ride
exports.createRide = (req, res) => {
    try {
        const { driver, passenger, startLocation, endLocation } = req.body;

        if (!driver || !passenger || !startLocation || !endLocation) {
            return res.status(400).send('All fields are required');
        }

        const newRide = new Ride(driver, passenger, startLocation, endLocation);
        rides.push(newRide);

        res.redirect('/rides');
    } catch (error) {
        console.error('Error creating ride:', error);
        res.status(500).send('Server Error');
    }
};

// Controller to handle searching for a route
exports.searchRoute = async (req, res) => {
    const { startLat, startLon, endLat, endLon } = req.body;
    const apiKey = 'd3c9b486da0340fa8868e082ddded97b';
    const url = `https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLon}|${endLat},${endLon}&mode=drive&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const routeData = response.data;

        res.render('routeResults', { routeData });
    } catch (error) {
        console.error('Error fetching route:', error);
        res.status(500).send('Server Error: Unable to fetch route');
    }
};
