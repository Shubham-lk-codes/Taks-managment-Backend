// routes/feedbackRoutes.js
const express = require('express');
const { submitFeedback,getFeedback } = require('../controllers/Feedback.Controller');


const router = express.Router();

// POST route to submit feedback
router.post('/feedback', submitFeedback);
router.get('/feedback', getFeedback);

module.exports = router;
