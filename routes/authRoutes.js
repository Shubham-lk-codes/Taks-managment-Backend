const express = require('express');
const { signup, login,getUsers, removeUser } = require('../controllers/authController');


const router = express.Router();

// Sign Up Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Get All Users Route (Admin or authorized access)
router.get('/users', getUsers);

// Remove User Route (Admin or authorized access)
router.delete('/users/:userId', removeUser);

module.exports = router;
