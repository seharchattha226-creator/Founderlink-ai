
const express = require('express');
const {
  generateIdea,
  analyzeStartup,
  generateRoadmap,
  getHistory,
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All AI routes are protected
router.use(protect);

router.post('/generate-idea', generateIdea);
router.post('/analyze-startup', analyzeStartup);
router.post('/roadmap', generateRoadmap);
router.get('/history', getHistory);

module.exports = router;
