const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const ideaRoutes = require('./routes/ideaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Database Connection
mongoose
  .connect('mongodb://localhost:27017/ims_connect', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/api/ideas', ideaRoutes);
app.use('/api/auth', authRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
