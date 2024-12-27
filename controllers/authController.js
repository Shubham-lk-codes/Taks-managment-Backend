const User = require('../models/user');
const jwt = require('jsonwebtoken');



// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Sign Up User
// Sign Up User
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({ message: 'Login successful', token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// Logout User
exports.logout = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.json({ message: 'Logout successful' });
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    // Fetch users from the database
    const users = await User.find();

    // Check if there are users
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove a user
exports.removeUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from the URL parameters

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

