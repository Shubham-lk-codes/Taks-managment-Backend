const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const ideaRoutes = require('./routes/ideaRoutes');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedback.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Database Connection
mongoose
  .connect('mongodb+srv://shubhamlonkar137:zYOMn6ft6xPBJt7B@cluster0.afb03.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/api/ideas', ideaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

//zYOMn6ft6xPBJt7B