const express = require('express');
const {
  createIdea,
  getAllIdeas,
  updateIdeaStatus,
} = require('../controllers/ideaController');

const router = express.Router();

// Routes
router.post('/', createIdea);
router.get('/', getAllIdeas);
router.patch('/:id', updateIdeaStatus);

module.exports = router;
