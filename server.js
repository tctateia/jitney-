const express = require('express');
const app = express();
const rideRoutes = require('./routes/rideRoutes');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

// View engine setup
app.set('view engine', 'ejs');

// Routes
app.use('/rides', rideRoutes);

// Home route
app.get('/rides', (req, res) => {
    const { driver } = req.query;
    const filteredRides = driver ? rides.filter(ride => ride.driver === driver) : rides;
    res.render('rides', { rides: filteredRides });
});

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
