const Feedback = require('../models/Feedback');

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;

    // No authentication check, any user can submit feedback
    const newFeedback = new Feedback({
      feedback,
    });

    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

// Get all submitted feedback
exports.getFeedback = async (req, res) => {
    try {
      // Fetch all feedback records
      const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Sort by created date, descending (latest first)
      
      // If no feedback found
      if (feedbacks.length === 0) {
        return res.status(404).json({ message: 'No feedback available.' });
      }
  
      res.status(200).json({ feedbacks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch feedback' });
    }
  };
