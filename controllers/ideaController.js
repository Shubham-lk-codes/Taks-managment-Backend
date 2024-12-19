const Idea = require('../models/idea');

// Create a New Idea
exports.createIdea = async (req, res) => {
  try {
    const { title, description, employeeId } = req.body;
    const newIdea = new Idea({ title, description, employeeId });
    await newIdea.save();
    res.status(201).json(newIdea);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create idea' });
  }
};

// Get All Ideas
exports.getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve ideas' });
  }
};

// Approve or Reject an Idea
exports.updateIdeaStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedIdea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    res.json(updatedIdea);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update idea status' });
  }
};
