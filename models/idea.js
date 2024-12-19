const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  title: String,
  description: String,
  employeeId: String,
  status: { type: String, default: 'Submitted' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Idea', IdeaSchema);
