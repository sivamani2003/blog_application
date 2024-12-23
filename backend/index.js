const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // To parse JSON in request body
app.use(cors({
    origin: 'http://localhost:5173',  // Only allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials (cookies)
  })); // Allow cross-origin requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Start the server
const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
