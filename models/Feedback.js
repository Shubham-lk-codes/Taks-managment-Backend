// models/Feedback.js
const mongoose = require('mongoose');

// Define the feedback schema
const feedbackSchema = new mongoose.Schema(
  {
   
    feedback: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
