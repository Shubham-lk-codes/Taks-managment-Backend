const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

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

    // Set token in a cookie
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour

    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
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

    // Set token in a cookie
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour

    res.json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Logout User
exports.logout = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.json({ message: 'Logout successful' });
};
